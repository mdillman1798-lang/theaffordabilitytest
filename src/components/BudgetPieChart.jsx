import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { fmt } from '../utils/calculations';

const PALETTE = [
  { key: 'housing',       label: 'Housing',        color: '#6366f1' },
  { key: 'car',           label: 'Car & Transport', color: '#f97316' },
  { key: 'food',          label: 'Food',            color: '#10b981' },
  { key: 'utilities',     label: 'Utilities',       color: '#3b82f6' },
  { key: 'healthIns',     label: 'Health Ins.',     color: '#ec4899' },
  { key: 'savings',       label: 'Savings',         color: '#8b5cf6' },
  { key: 'discretionary', label: 'Discretionary',   color: '#f59e0b' },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <div className="font-medium text-slate-700">{name}</div>
      <div className="font-bold text-slate-900 tabular-nums">{fmt(value)}/mo</div>
    </div>
  );
}

function Legend({ netMonthly, data }) {
  return (
    <div className="grid grid-cols-1 gap-1 mt-2">
      {data.map((entry) => {
        const p = netMonthly > 0 ? ((entry.value / netMonthly) * 100).toFixed(1) : '0.0';
        return (
          <div key={entry.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.fill }} />
              <span className="text-xs text-slate-500">{entry.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-slate-700 tabular-nums">{fmt(entry.value)}</span>
              <span className="text-slate-400 tabular-nums w-8 text-right">{p}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BudgetPieChart({ budget }) {
  const { housing, car, food, utilities, healthIns, savings, discretionary, netMonthly } = budget;

  const raw = { housing, car, food, utilities, healthIns, savings, discretionary: Math.max(0, discretionary) };
  const data = PALETTE
    .map((p) => ({ name: p.label, value: raw[p.key] || 0, fill: p.color }))
    .filter((d) => d.value > 0);

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="-mt-28 mb-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-xs text-slate-400">Net / mo</div>
        <div className="text-base font-black text-slate-800 tabular-nums">{fmt(netMonthly)}</div>
      </div>

      <Legend netMonthly={netMonthly} data={data} />
    </div>
  );
}
