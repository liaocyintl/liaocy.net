<?php

namespace App\Http\Controllers;

require_once(__DIR__ . "/../../../vendor/autoload.php");

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use YConnect\Constant\OIDConnectDisplay;
use YConnect\Constant\OIDConnectPrompt;
use YConnect\Constant\OIDConnectScope;
use YConnect\Constant\ResponseType;
use YConnect\Credential\ClientCredential;
use YConnect\YConnectClient;

class SettingController extends Controller
{
    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('setting.index', [
            'my' => User::find(auth()->id())
        ]);
    }
    /**
     * Yahoo認証
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request)
    {
        try {
            $params = $request->all();
            $my = User::find(auth()->id());
            if ($params["act"] === "common_setting") {

                $validator = Validator::make($params, [
                    'common_currency_rate' => ['required', 'integer', 'min:1', 'max:999999'],
                    'common_country_shipping' => ['required', 'integer', 'min:0', 'max:999999'],
                    'common_foreign_shipping_without_weight' => ['required', 'integer', 'min:0', 'max:999999'],
                    'common_customs_tax' => ['required', 'numeric', 'min:0', 'max:100'],
                    'common_purchase_price_from' => ['required', 'integer', 'min:1', 'max:999999'],
                    'common_purchase_price_to' => ['required', 'integer', 'min:1', 'max:999999'],
                    'common_max_weight' => ['required', 'integer', 'min:1', 'max:999999'],
                    'common_size_from' => ['required', 'integer', 'min:0', 'max:999999'],
                    'common_size_to' => ['required', 'integer', 'min:1', 'max:999999'],
                    'common_purchase_mark' => ['required', 'numeric', 'min:0', 'max:100']
                ]);

                if ($validator->fails()) {
                    return back()->withErrors($validator)->withInput();
                }

                $my->common_currency_rate = $params["common_currency_rate"];
                $my->common_country_shipping = $params["common_country_shipping"];
                $my->common_foreign_shipping_without_weight = $params["common_foreign_shipping_without_weight"];
                $my->common_customs_tax = $params["common_customs_tax"] / 100;
                $my->common_purchase_price_from = $params["common_purchase_price_from"];
                $my->common_purchase_price_to = $params["common_purchase_price_to"];
                $my->common_max_weight = $params["common_max_weight"];
                $my->common_size_from = $params["common_size_from"];
                $my->common_size_to = $params["common_size_to"];
                $my->common_purchase_mark = $params["common_purchase_mark"] / 100;
                $my->save();

                if ($request->hasFile('common_foreign_shipping')) {
                    //拡張子がCSVであるかの確認
                    if ($request->common_foreign_shipping->getClientOriginalExtension() !== "csv") {
                        throw new \Exception("不適切な拡張子です。CSVファイルを選択してください。");
                    }
                    //ファイルの保存
                    // $newCsvFileName = $request->csvFile->getClientOriginalName();
                    // $request->csvFile->storeAs('public/csv', $newCsvFileName);

                    $foreignShippings = array();
                    if (($handle = fopen($request->common_foreign_shipping, "r")) !== FALSE) {
                        $row = 0;
                        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                            if ($row === 0) {
                                if (count($data) != 2 || strcmp($data[0], "重量(KG)") !== 0 || strcmp($data[1], "費用(USD)") !== 0) {
                                    throw new \Exception("CSVファイルのフォーマットが不適切です。もう一度ダウンロードしてください。１");
                                }
                            } else {
                                if (count($data) != 2) {
                                    throw new \Exception("CSVファイルのフォーマットが不適切です。もう一度ダウンロードしてください。");
                                }
                                if (!is_numeric($data[0]) || !is_numeric($data[1])) {
                                    throw new \Exception("CSVファイルのフォーマットが不適切です。もう一度ダウンロードしてください。");
                                }
                                array_push($foreignShippings, [
                                    "user_id" => auth()->id(),
                                    "weight_kg" => (double)$data[0], 
                                    "usd_fee" => (double)$data[1]]
                                );
                            }
                            $row++;
                            if ($row > 1000) {
                                throw new \Exception("CSVファイルの行数が1000行を超えています。もう一度ダウンロードしてください。");
                            }
                        }
                        fclose($handle);
                    }
                    ForeignShipping::where("user_id", auth()->id())->delete();
                    ForeignShipping::insert($foreignShippings);
                }


                return redirect()->route('setting.index')->with('success', '共通設定を更新しました。');
            } elseif ($params["act"] === "yahoo_auth") {

                $validator = Validator::make($params, [
                    'yahoo_store_account' => ['required', 'string', 'max:255'],
                    'yahoo_client_id' => ['required', 'string', 'max:255'],
                    'yahoo_secret' => ['required', 'string', 'max:255']
                ]);

                if ($validator->fails()) {
                    return back()->withErrors($validator)->withInput();
                }

                $yahoo_client_id = $params['yahoo_client_id'];
                $yahoo_secret = $params['yahoo_secret'];

                $cred = new ClientCredential($yahoo_client_id, $yahoo_secret);
                $client = new YConnectClient($cred);

                $state = $this->generateRandomString(36);
                $nonce = $this->generateRandomString(52);


                $my->yahoo_store_account = $params['yahoo_store_account'];
                $my->yahoo_client_id = $params['yahoo_client_id'];
                $my->yahoo_secret = $params['yahoo_secret'];
                $my->yahoo_state = $state;
                $my->yahoo_nonce = $nonce;
                $my->save();

                $redirect_uri = route('yahoo_callback');

                $response_type = ResponseType::CODE;
                $scope = array(
                    OIDConnectScope::OPENID,
                    OIDConnectScope::PROFILE,
                    OIDConnectScope::EMAIL,
                    OIDConnectScope::ADDRESS
                );
                $display = OIDConnectDisplay::DEFAULT_DISPLAY;
                $prompt = array(
                    OIDConnectPrompt::DEFAULT_PROMPT
                );

                $client->requestAuth(
                    $redirect_uri,
                    $state,
                    $nonce,
                    $response_type,
                    $scope,
                    $display,
                    $prompt
                );
            }
        } catch (\Exception $e) {
            return back()->withErrors($e->getMessage());
        }
    }

    public function yahooCallBack(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'state' => ['required', 'string', 'max:255'],
                'code' => ['required', 'string', 'max:255']
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }

            $params = $request->all();
            $yahoo_state = $params['state'];

            $my = Auth::user();

            $yahoo_client_id = $my->yahoo_client_id;
            $yahoo_secret = $my->yahoo_secret;

            $cred = new ClientCredential($yahoo_client_id, $yahoo_secret);
            $client = new YConnectClient($cred);

            $state = $my->yahoo_state;
            $nonce = $my->yahoo_nonce;
            $redirect_uri = route('yahoo_callback');

            $code_result = $client->getAuthorizationCode($state);
            if( $code_result ) {
                // Tokenエンドポイントにリクエスト
                $client->requestAccessToken(
                    $redirect_uri,
                    $code_result
                );
                // IDトークンを検証(4)
                $accessToken  = $client->getAccessToken();
                $client->verifyIdToken($nonce, $accessToken);
                $refreshToken = $client->getRefreshToken();
                $yahoo_access_token_expires_in = date("Y-m-d H:i:s", $client->getAccessTokenExpiration() + time());
                $yahoo_refresh_token_expires_in = date("Y-m-d H:i:s", strtotime("+25 day"));
                //トークンの保存
                $my->yahoo_access_token = $accessToken;
                $my->yahoo_refresh_token = $refreshToken;
                $my->yahoo_access_token_expires_in = $yahoo_access_token_expires_in;
                $my->yahoo_refresh_token_expires_in = $yahoo_refresh_token_expires_in;
                $my->save();

                return redirect()->route('setting.index')->with('success', 'Yahoo認証しました。');
                
            }
        } catch (\Exception $e) {
            $my->yahoo_access_token = null;
            $my->yahoo_refresh_token = null;
            $my->yahoo_access_token_expires_in = null;
            $my->yahoo_refresh_token_expires_in = null;
            $my->save();
            return redirect()->route('setting.index')->withErrors('success', 'Yahoo認証が失敗しました。もう一度お試しください。');
        }
    }
}
