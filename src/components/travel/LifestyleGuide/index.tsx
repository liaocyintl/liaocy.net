import React, { useState } from 'react';
import { translate } from '@docusaurus/Translate';
import { useLocaleData } from '@site/src/data/australia';
import styles from './index.module.css';

/* ── Type definitions ── */

interface TimeSlot {
  time: string;
  activity_zh: string;
}

interface DaySchedule {
  day_en: string;
  day_zh: string;
  typical_schedule: TimeSlot[];
  notes_zh: string;
}

interface MealSection {
  description_zh: string;
  common_items_zh: string[];
  avg_cost: number;
}

interface Cuisine {
  name_zh: string;
  description_zh: string;
}

interface FoodCulture {
  breakfast: MealSection;
  lunch: MealSection;
  dinner: MealSection;
  coffee_culture_zh: string;
  dining_out_tips_zh: string[];
  asian_food_zh: string;
  popular_cuisines: Cuisine[];
}

interface Hobby {
  name_zh: string;
  name_en: string;
  popularity: string;
  cost_level: string;
  description_zh: string;
  student_friendly: boolean;
}

interface BudgetCategory {
  category_zh: string;
  min: number;
  max: number;
  tips_zh: string;
}

interface MonthlyBudget {
  categories: BudgetCategory[];
  total_min: number;
  total_max: number;
  saving_tips_zh: string[];
}

interface TransportMode {
  name_zh: string;
  description_zh: string;
  student_discount_zh: string;
}

interface Transport {
  modes: TransportMode[];
  driving_zh: string;
  cycling_zh: string;
  rideshare_zh: string;
}

interface PublicHoliday {
  name_en: string;
  name_zh: string;
  date_zh: string;
  description_zh: string;
  student_impact_zh: string;
}

interface ShoppingSupermarket {
  name: string;
  description_zh: string;
}

interface OnlinePlatform {
  name: string;
  description_zh: string;
}

interface SalesEvent {
  name_zh: string;
  when_zh: string;
  description_zh: string;
}

interface Shopping {
  supermarkets: ShoppingSupermarket[];
  asian_groceries_zh: string;
  online_shopping: OnlinePlatform[];
  tipping_zh: string;
  sales_events: SalesEvent[];
}

interface LifestyleData {
  weekly_schedule: DaySchedule[];
  food_culture: FoodCulture;
  hobbies: Hobby[];
  monthly_budget: MonthlyBudget;
  transport: Transport;
  public_holidays: PublicHoliday[];
  shopping: Shopping;
}

type SubTab =
  | 'schedule'
  | 'food'
  | 'hobbies'
  | 'budget'
  | 'transport'
  | 'holidays'
  | 'shopping';

/* ── Sub-tab definitions ── */

const SUB_TABS: { id: SubTab; label: () => string }[] = [
  {
    id: 'schedule',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.schedule', message: 'Weekly Schedule' }),
  },
  {
    id: 'food',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.food', message: 'Food Culture' }),
  },
  {
    id: 'hobbies',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.hobbies', message: 'Hobbies' }),
  },
  {
    id: 'budget',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.budget', message: 'Monthly Budget' }),
  },
  {
    id: 'transport',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.transport', message: 'Transport' }),
  },
  {
    id: 'holidays',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.holidays', message: 'Public Holidays' }),
  },
  {
    id: 'shopping',
    label: () =>
      translate({ id: 'aus.lifestyle.tab.shopping', message: 'Shopping' }),
  },
];

/* ── Component ── */

export default function LifestyleGuide(): JSX.Element {
  const { lifestyle } = useLocaleData() as { lifestyle: LifestyleData };
  const [activeTab, setActiveTab] = useState<SubTab>('schedule');

  return (
    <div className="container">
      {/* Sub-tab pills */}
      <div className={styles.pillRow}>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.pill} ${activeTab === tab.id ? styles.pillActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label()}
          </button>
        ))}
      </div>

      {activeTab === 'schedule' && <WeeklySchedule data={lifestyle.weekly_schedule} />}
      {activeTab === 'food' && <FoodCultureSection data={lifestyle.food_culture} />}
      {activeTab === 'hobbies' && <HobbiesSection data={lifestyle.hobbies} />}
      {activeTab === 'budget' && <BudgetSection data={lifestyle.monthly_budget} />}
      {activeTab === 'transport' && <TransportSection data={lifestyle.transport} />}
      {activeTab === 'holidays' && <HolidaysSection data={lifestyle.public_holidays} />}
      {activeTab === 'shopping' && <ShoppingSection data={lifestyle.shopping} />}
    </div>
  );
}

/* ── 1. Weekly Schedule ── */

function WeeklySchedule({ data }: { data: DaySchedule[] }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.schedule.title', message: 'Typical Weekly Schedule' })}
      </h2>
      {data.map((day) => (
        <div className={styles.scheduleDay} key={day.day_en}>
          <h3 className={styles.dayHeader}>{day.day_zh}</h3>
          {day.typical_schedule.map((slot, i) => (
            <div className={styles.timeSlot} key={i}>
              <span className={styles.time}>{slot.time}</span>
              <span className={styles.activity}>{slot.activity_zh}</span>
            </div>
          ))}
          {day.notes_zh && <p className={styles.dayNotes}>{day.notes_zh}</p>}
        </div>
      ))}
    </>
  );
}

/* ── 2. Food Culture ── */

function MealCard({ title, meal }: { title: string; meal: MealSection }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        {title}{' '}
        <span className={styles.avgCost}>
          ~${meal.avg_cost}
        </span>
      </h3>
      <p className={styles.cardDesc}>{meal.description_zh}</p>
      <ul className={styles.itemList}>
        {meal.common_items_zh.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function FoodCultureSection({ data }: { data: FoodCulture }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.food.title', message: 'Food Culture' })}
      </h2>

      <div className={styles.cardGrid}>
        <MealCard
          title={translate({ id: 'aus.lifestyle.food.breakfast', message: 'Breakfast' })}
          meal={data.breakfast}
        />
        <MealCard
          title={translate({ id: 'aus.lifestyle.food.lunch', message: 'Lunch' })}
          meal={data.lunch}
        />
        <MealCard
          title={translate({ id: 'aus.lifestyle.food.dinner', message: 'Dinner' })}
          meal={data.dinner}
        />
      </div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.food.coffee', message: 'Coffee Culture' })}
      </h3>
      <div className={styles.infoBox}>{data.coffee_culture_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.food.diningTips', message: 'Dining Out Tips' })}
      </h3>
      <ul className={styles.tipList}>
        {data.dining_out_tips_zh.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.food.asianFood', message: 'Asian Food' })}
      </h3>
      <div className={styles.infoBox}>{data.asian_food_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.food.popularCuisines', message: 'Popular Cuisines' })}
      </h3>
      <div className={styles.cardGrid}>
        {data.popular_cuisines.map((c) => (
          <div className={styles.card} key={c.name_zh}>
            <h4 className={styles.cardTitle}>{c.name_zh}</h4>
            <p className={styles.cardDesc}>{c.description_zh}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── 3. Hobbies ── */

function HobbiesSection({ data }: { data: Hobby[] }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.hobbies.title', message: 'Popular Hobbies & Activities' })}
      </h2>
      <div className={styles.cardGrid}>
        {data.map((hobby) => (
          <div className={styles.card} key={hobby.name_en}>
            <div className={styles.metaRow}>
              <h3 className={styles.cardTitle}>{hobby.name_zh}</h3>
              {hobby.student_friendly && (
                <span className={styles.badgeGreen}>
                  {translate({ id: 'aus.lifestyle.hobbies.studentFriendly', message: 'Student-friendly' })}
                </span>
              )}
            </div>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.lifestyle.hobbies.popularity', message: 'Popularity' })}
                </span>
                <span className={styles.metaValue}>{hobby.popularity}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {translate({ id: 'aus.lifestyle.hobbies.cost', message: 'Cost' })}
                </span>
                <span className={styles.costBadge}>{hobby.cost_level}</span>
              </div>
            </div>
            <p className={styles.cardDesc}>{hobby.description_zh}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── 4. Monthly Budget ── */

function BudgetSection({ data }: { data: MonthlyBudget }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.budget.title', message: 'Monthly Budget Guide (AUD)' })}
      </h2>

      <div className={styles.tableWrapper}>
        <table className={styles.budgetTable}>
          <thead>
            <tr>
              <th>{translate({ id: 'aus.lifestyle.budget.category', message: 'Category' })}</th>
              <th>{translate({ id: 'aus.lifestyle.budget.min', message: 'Min' })}</th>
              <th>{translate({ id: 'aus.lifestyle.budget.max', message: 'Max' })}</th>
              <th>{translate({ id: 'aus.lifestyle.budget.tips', message: 'Tips' })}</th>
            </tr>
          </thead>
          <tbody>
            {data.categories.map((cat) => (
              <tr key={cat.category_zh}>
                <td style={{ fontWeight: 600 }}>{cat.category_zh}</td>
                <td>${cat.min}</td>
                <td>${cat.max}</td>
                <td>{cat.tips_zh}</td>
              </tr>
            ))}
            <tr className={styles.totalRow}>
              <td>{translate({ id: 'aus.lifestyle.budget.total', message: 'Total' })}</td>
              <td>${data.total_min}</td>
              <td>${data.total_max}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.budget.savingTips', message: 'Saving Tips' })}
      </h3>
      <ul className={styles.tipList}>
        {data.saving_tips_zh.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </>
  );
}

/* ── 5. Transport ── */

function TransportSection({ data }: { data: Transport }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.transport.title', message: 'Transport Guide' })}
      </h2>

      <div className={styles.cardGrid2}>
        {data.modes.map((mode) => (
          <div className={styles.card} key={mode.name_zh}>
            <h3 className={styles.cardTitle}>{mode.name_zh}</h3>
            <p className={styles.cardDesc}>{mode.description_zh}</p>
            <div>
              <span className={styles.badge}>
                {translate({ id: 'aus.lifestyle.transport.studentDiscount', message: 'Student Discount' })}
              </span>
              <p className={styles.cardDesc} style={{ marginTop: 6 }}>
                {mode.student_discount_zh}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.transport.driving', message: 'Driving' })}
      </h3>
      <div className={styles.infoBox}>{data.driving_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.transport.cycling', message: 'Cycling' })}
      </h3>
      <div className={styles.infoBox}>{data.cycling_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.transport.rideshare', message: 'Rideshare' })}
      </h3>
      <div className={styles.infoBox}>{data.rideshare_zh}</div>
    </>
  );
}

/* ── 6. Public Holidays ── */

function HolidaysSection({ data }: { data: PublicHoliday[] }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.holidays.title', message: 'Public Holidays' })}
      </h2>
      <div className={styles.cardGrid2}>
        {data.map((h) => (
          <div className={styles.card} key={h.name_en}>
            <h3 className={styles.cardTitle}>{h.name_zh}</h3>
            <span className={styles.holidayDate}>{h.date_zh}</span>
            <p className={styles.cardDesc}>{h.description_zh}</p>
            <div className={styles.holidayImpact}>
              <span className={styles.metaLabel}>
                {translate({ id: 'aus.lifestyle.holidays.studentImpact', message: 'Student Impact' })}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>
                {h.student_impact_zh}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── 7. Shopping ── */

function ShoppingSection({ data }: { data: Shopping }) {
  return (
    <>
      <h2 className={styles.sectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.title', message: 'Shopping Guide' })}
      </h2>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.supermarkets', message: 'Supermarkets' })}
      </h3>
      <div className={styles.cardGrid}>
        {data.supermarkets.map((s) => (
          <div className={styles.card} key={s.name}>
            <h4 className={styles.cardTitle}>{s.name}</h4>
            <p className={styles.cardDesc}>{s.description_zh}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.asianGroceries', message: 'Asian Groceries' })}
      </h3>
      <div className={styles.infoBox}>{data.asian_groceries_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.online', message: 'Online Shopping' })}
      </h3>
      <div className={styles.cardGrid}>
        {data.online_shopping.map((p) => (
          <div className={styles.card} key={p.name}>
            <h4 className={styles.cardTitle}>{p.name}</h4>
            <p className={styles.cardDesc}>{p.description_zh}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.tipping', message: 'Tipping' })}
      </h3>
      <div className={styles.infoBox}>{data.tipping_zh}</div>

      <h3 className={styles.subSectionTitle}>
        {translate({ id: 'aus.lifestyle.shopping.salesEvents', message: 'Sales Events' })}
      </h3>
      <div className={styles.cardGrid}>
        {data.sales_events.map((e) => (
          <div className={styles.card} key={e.name_zh}>
            <h4 className={styles.cardTitle}>{e.name_zh}</h4>
            <span className={styles.badge}>{e.when_zh}</span>
            <p className={styles.cardDesc}>{e.description_zh}</p>
          </div>
        ))}
      </div>
    </>
  );
}
