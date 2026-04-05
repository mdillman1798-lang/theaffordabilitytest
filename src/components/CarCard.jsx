import { useState } from 'react';
import { fmt } from '../utils/calculations';
import Tooltip from './Tooltip';

const SCENARIOS = [
  { key: 'conservative', label: 'Conservative', activeClass: 'bg-emerald-600 text-white', accentClass: 'text-emerald-600' },
  { key: 'moderate',     label: 'Moderate',     activeClass: 'bg-slate-800 text-white',   accentClass: 'text-slate-800'   },
  { key: 'aggressive',   label: 'Aggressive',   activeClass: 'bg-orange-500 text-white',  accentClass: 'text-orange-500'  },
];

function CostRow({ label, tooltip, value, sub }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-600 flex items-center">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </span>
      <div className="text-right">
        <div className="text-sm font-semibold text-slate-800 tabular-nums">{value}</div>
        {sub && <div className="text-xs text-slate-400">{sub}</div>}
      </div>
    </div>
  );
}

export default function CarCard({ data }) {
  const [active, setActive] = useState(1);
  const { scenarios, stateAutoIns } = data;
  const sc = scenarios[active];
  const S = SCENARIOS[active];

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Car Affordability</h3>
          <p className="text-xs text-slate-400 mt-0.5">True monthly cost including all expenses</p>
        </div>
      </div>

      <div className="flex gap-1.5 mb-4 bg-slate-100 p-1 rounded-lg w-fit">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={`scenario-btn text-xs ${active === i ? s.activeClass : 'text-slate-500 hover:text-slate-700'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 mb-5">{sc.desc}</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <div className="text-xs text-slate-400 mb-1">Max Loan Payment</div>
          <div className={`text-2xl font-black tabular-nums ${S.accentClass}`}>
            {fmt(sc.maxMonthlyPayment)}<span className="text-sm font-normal text-slate-400">/mo</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">to lender only</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-1 flex items-center">
            Est. Vehicle Price
            <Tooltip text="Based on a 5-year loan at 7% interest. Actual price varies by credit score and trade-in." />
          </div>
          <div className={`text-2xl font-black tabular-nums ${S.accentClass}`}>
            {fmt(sc.estimatedVehiclePrice)}
          </div>
          <div className="text-xs text-slate-400 mt-1">5-yr loan at 7%</div>
        </div>
      </div>

      <div className="border border-slate-100 rounded-lg overflow-hidden mb-4">
        <CostRow
          label="Loan Payment"
          value={`${fmt(sc.maxMonthlyPayment)}/mo`}
          sub="what you pay the lender"
        />
        <CostRow
          label="Auto Insurance"
          tooltip={`State average: ${fmt(stateAutoIns)}/mo. Rates vary by age, driving record, and vehicle.`}
          value={`${fmt(sc.autoInsurance)}/mo`}
          sub="state average"
        />
        <CostRow
          label="Fuel"
          tooltip="Assumes ~1,000 miles/month at your state's average gas price."
          value={`${fmt(sc.gasMonthly)}/mo`}
          sub="~1,000 mi/mo"
        />
        <CostRow
          label="Maintenance"
          tooltip="Oil changes, tires, registration, repairs. Luxury or older vehicles cost more."
          value={`${fmt(sc.maintenance)}/mo`}
          sub="oil, tires, repairs"
        />
      </div>

      <div className="flex justify-between items-center bg-slate-50 rounded-lg px-4 py-3">
        <span className="text-sm font-medium text-slate-600">Total Monthly</span>
        <span className={`text-lg font-black tabular-nums ${S.accentClass}`}>{fmt(sc.totalMonthly)}/mo</span>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Found a specific car?{' '}
        <a
          href="https://ismycardealgood.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 underline underline-offset-2 hover:text-slate-900 transition-colors"
        >
          Check if it's a good deal →
        </a>
      </p>
    </div>
  );
}
