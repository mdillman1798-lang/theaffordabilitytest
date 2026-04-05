import { fmt } from '../utils/calculations';
import BudgetPieChart from './BudgetPieChart';

const ROWS = [
  { key: 'housing',       label: 'Housing',            color: 'bg-indigo-500', tip: 'Rent or mortgage (moderate scenario)' },
  { key: 'car',           label: 'Car & Transport',    color: 'bg-orange-500', tip: 'Loan + insurance + fuel + maintenance' },
  { key: 'food',          label: 'Food & Groceries',   color: 'bg-emerald-500', tip: '~12% of take-home — groceries, restaurants, coffee' },
  { key: 'utilities',     label: 'Utilities',          color: 'bg-blue-500',   tip: 'Electric, gas, water, internet, phone (~5.5%)' },
  { key: 'healthIns',     label: 'Health Insurance',   color: 'bg-pink-500',   tip: 'Medical, dental, vision premiums (~5.5%)' },
  { key: 'savings',       label: 'Savings',            color: 'bg-violet-500', tip: 'Emergency fund + 401(k) + investments' },
  { key: 'discretionary', label: 'Spending Money',     color: 'bg-amber-500',  tip: 'Entertainment, travel, dining, subscriptions' },
];

function BudgetRow({ label, value, pct, color, tip }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-700">{label}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 tabular-nums">{pct}%</span>
            <span className="text-sm font-semibold text-slate-800 tabular-nums w-16 text-right">{fmt(value)}</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
          <div className={`h-1 rounded-full ${color}`} style={{ width: `${Math.min(100, pct * 2)}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-1">{tip}</p>
      </div>
    </div>
  );
}

const RULES = [
  {
    name: '50/30/20',
    desc: '50% of take-home on needs, 30% on wants, 20% saved.',
  },
  {
    name: '28% Housing',
    desc: 'Keep rent or mortgage under 28% of gross income. Lenders use this as a standard guideline.',
  },
  {
    name: 'Reality check',
    desc: 'In high-cost cities, 35–45% on housing is common. Prioritize keeping savings above 10%.',
  },
];

export default function LifestyleCard({ budget, inputs }) {
  const { netMonthly, housing, car, food, utilities, healthIns, savings, discretionary } = budget;
  const { aggressiveSaver } = inputs;

  const values = { housing, car, food, utilities, healthIns, savings, discretionary: Math.max(0, discretionary) };
  const totalExpenses = Object.values(values).reduce((a, b) => a + b, 0);
  const surplusDeficit = netMonthly - totalExpenses;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Monthly Budget</h3>
        {aggressiveSaver && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Aggressive Saver
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 mb-5">Moderate housing & car scenarios</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BudgetPieChart budget={budget} />
        </div>

        <div>
          <div>
            {ROWS.map((row) => {
              const val = values[row.key] || 0;
              const p = netMonthly > 0 ? ((val / netMonthly) * 100).toFixed(1) : '0.0';
              return (
                <BudgetRow key={row.key} label={row.label} value={val} pct={p} color={row.color} tip={row.tip} />
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total budgeted</span>
              <span className="font-semibold text-slate-700 tabular-nums">{fmt(totalExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Take-home</span>
              <span className="font-semibold text-slate-700 tabular-nums">{fmt(netMonthly)}</span>
            </div>
            <div className={`flex justify-between text-sm font-bold pt-2 border-t border-slate-200 ${surplusDeficit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              <span>{surplusDeficit >= 0 ? 'Unbudgeted' : 'Over budget'}</span>
              <span className="tabular-nums">{surplusDeficit >= 0 ? '+' : ''}{fmt(surplusDeficit)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Common guidelines</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RULES.map((r) => (
            <div key={r.name} className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs font-semibold text-slate-700 mb-1">{r.name}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        All percentages are of monthly take-home pay. Pre-tax 401(k) contributions reduce taxable income and effectively increase your take-home.
      </p>
    </div>
  );
}
