<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\RefreshYahooAPIAuth;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Jobs\UpdateAmazonInfo;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use App\Models\ProductBatch;
use App\Jobs\UpdateAmazonJPExhibit;
use App\Jobs\UpdateYahooJPExhibit;
use App\Services\YahooService;
use Illuminate\Support\Facades\DB;
use Throwable;


class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $this->updateAmazonInfo();
        })->everyMinute();

        $schedule->call(function () {
            $this->UpdateAmazonJPExhibit();
        })->hourlyAt(30);

        $schedule->call(function () {
            $this->UpdateYahooJPExhibit();
        })->hourlyAt(30);

        // 删除 72 小时前完成的所有批次
        // $schedule->command('queue:prune-batches --hours=72')->daily();

        // Release all jobs that have been reserved for too long.
        // Probably due to a worker crash.
        $schedule->call(function () {
            $this->releaseAllReservedJobs();
        })->hourlyAt(0);
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    /**
     * 24時間以上経過している商品のAmazon情報を更新する
     *
     * @return void
     */
    protected function updateAmazonInfo()
    {
        //チェック対象の商品を取得
        $products = Product::where([
            ["amazon_jp_has_exhibited", true], //AmazonJPへ出品済み
            ["amazon_is_in_checklist", false], //チェックキューに入っていない
            ["amazon_latest_check_at", "<", Carbon::now()->subHour(24)], //最終チェックから24時間以上経過
            ["cancel_exhibit_to_amazon_jp", false], //削除されていない
        ])->orWhere([
            ["yahoo_jp_has_exhibited", true], //YahooJPへ出品済み
            ["yahoo_is_in_checklist", false], //チェックキューに入っていない
            ["yahoo_latest_check_at", "<", Carbon::now()->subHour(24)], //最終チェックから24時間以上経過
            ["cancel_exhibit_to_yahoo_jp", false], //削除されていない
        ])->limit(1000)->cursor();

        foreach($products as $product) {
            $product->amazon_is_in_checklist = true; //チェックキューに入った
            $product->yahoo_is_in_checklist = true; //チェックキューに入った
            $product->save();

            $user = User::find($product->user_id);

            UpdateAmazonInfo::dispatch($product)->onQueue('update_amazon_info_' . $user->getJobSuffix()); //キューに追加
        }
    }

    /**
     * AmazonJP出品情報改定
     *
     * @return void
     */
    protected function updateAmazonJPExhibit() {
        $product_users = Product::select("user_id")
            ->where([
                ["amazon_jp_need_update_exhibit_info", true], //AmazonJPAmazonJPへ出品情報更新要
            ])->groupBy("user_id")->cursor();

        foreach($product_users as $product_user) {

            $user = User::find($product_user->user_id);

            // 出品情報更新を停止している場合はスキップ
            if ($user->amazon_jp_should_update_price === 0) {
                continue;
            }

            $products = Product::where([
                ["user_id", $product_user->user_id],
                ["amazon_jp_need_update_exhibit_info", true],
            ])->limit(1000)->cursor();

            $productBatch = new ProductBatch();
            $productBatch->user_id = $product_user->user_id;
            $productBatch->action = "update_amazon_jp_exhibit";
            $productBatch->save();

            
            foreach($products as $product) {
                $product->amazon_jp_need_update_exhibit_info = false; //AmazonJPへ出品情報更新要フラグをリセット
                $product->save();

                $product->productBatches()->attach($productBatch);
            }

            $updateAmazonJPExhibits = array();
            array_push($updateAmazonJPExhibits, new UpdateAmazonJPExhibit($productBatch));

            $batch = Bus::batch($updateAmazonJPExhibits)->name("update_amazon_jp_exhibit")->then(function (Batch $batch) {
                // すべてのジョブが正常に完了
            })->catch(function (Batch $batch, Throwable $e) {
                // バッチジョブの失敗をはじめて検出
            })->finally(function (Batch $batch) {
                // バッチジョブの完了
                $productBatch = ProductBatch::where('job_batch_id', $batch->id)->first();
                $productBatch->finished_at = now();
                $productBatch->save();
            })->onQueue('update_amazon_jp_exhibit_' . $user->getJobSuffix())->allowFailures()->dispatch();

            $productBatch->job_batch_id = $batch->id;
            $productBatch->save();
        }
    }

    /**
     * YahooJP出品情報改定
     *
     * @return void
     */
    protected function updateYahooJPExhibit() {
        $product_users = Product::select("user_id")
            ->where([
                ["yahoo_jp_need_update_exhibit_info", true], //YahooJPへ出品情報更新要
            ])->groupBy("user_id")->cursor();

        foreach($product_users as $product_user) {

            $user = User::find($product_user->user_id);

            // 出品情報更新を停止している場合はスキップ
            if ($user->yahoo_jp_should_update_price === 0) {
                continue;
            }

            $products = Product::where([
                ["user_id", $product_user->user_id],
                ["yahoo_jp_need_update_exhibit_info", true],
            ])->limit(1000)->cursor();

            $productBatch = new ProductBatch();
            $productBatch->user_id = $product_user->user_id;
            $productBatch->action = "update_yahoo_jp_exhibit";
            $productBatch->save();

            
            foreach($products as $product) {
                $product->yahoo_jp_need_update_exhibit_info = false; //YahooJPへ出品情報更新要フラグをリセット
                $product->save();
                $product->productBatches()->attach($productBatch);
            }

            $updateYahooJPExhibits = array();
            array_push($updateYahooJPExhibits, new UpdateYahooJPExhibit($productBatch));
            $batch = Bus::batch($updateYahooJPExhibits)->name("update_yahoo_jp_exhibit")->then(function (Batch $batch) {
                // すべてのジョブが正常に完了
            })->catch(function (Batch $batch, Throwable $e) {
                // バッチジョブの失敗をはじめて検出
            })->finally(function (Batch $batch) {
                // バッチジョブの完了
                $productBatch = ProductBatch::where('job_batch_id', $batch->id)->first();
                
                // debug: Attempt to read property "user_id" on null
                if (is_null($productBatch)) {
                    return;
                }
                
                $user = User::find($productBatch->user_id);
                $yahooService = new YahooService($user);

                // reservePublish
                sleep(10);
                try {
                    $yahooService->reservePublish();
                } catch (Throwable $e) {
                    Log::error($e->getMessage());
                    $productBatch->message .= "\n" . $e->getMessage();
                }

                $productBatch->finished_at = now();
                $productBatch->save();
            })->onQueue('update_yahoo_jp_exhibit_' . $user->getJobSuffix())->allowFailures()->dispatch();

            $productBatch->job_batch_id = $batch->id;
            $productBatch->save();
        }
    }

    /**
     * Release all jobs that have been reserved for too long.
     * Probably due to a worker crash.
     *
     * @return void
     */
    protected function releaseAllReservedJobs() {
        $jobs = DB::table('jobs')->where("reserved_at", "<", time() - 3 * 60 * 60)->get();
        foreach($jobs as $job) {
            Log::info("releaseAllReservedJobs: " . $job->id);
            DB::table('jobs')->where('id', $job->id)->update(['reserved_at' => null]);
        }
    }
}
