import { useState } from 'react';
import { fmt } from '../utils/calculations';
import Tooltip from './Tooltip';

const SCENARIOS = [
  { key: 'conservative', label: 'Conservative', activeClass: 'bg-emerald-600 text-white', accentClass: 'text-emerald-600' },
  { key: 'moderate',     label: 'Moderate',     activeClass: 'bg-slate-800 text-white',   accentClass: 'text-slate-800'   },
  { key: 'aggressive',   label: 'Aggressive',   activeClass: 'bg-orange-500 text-white',  accentClass: 'text-orange-500'  },
];

function BarRow({ label, tooltip, value, barPct, barColor }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-500 flex items-center">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </span>
        <span className="font-semibold text-slate-800 tabular-nums">{value}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${Math.min(100, barPct)}%` }} />
      </div>
    </div>
  );
}

export default function HousingCard({ data }) {
  const [active, setActive] = useState(1);
  const { scenarios, marketData } = data;
  const sc = scenarios[active];
  const S = SCENARIOS[active];
  const total = sc.totalMonthlyMortgage || 1;

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Housing Affordability</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {marketData.currentRate}% rate · {marketData.propertyTaxRate}% property tax
          </p>
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

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-xs text-slate-400 mb-1">Max Monthly Rent</div>
          <div className={`text-2xl font-black tabular-nums ${S.accentClass}`}>
            {fmt(sc.maxRent)}<span className="text-sm font-normal text-slate-400">/mo</span>
          </div>
          <div className={`text-xs mt-1 font-medium ${sc.maxRent >= marketData.avgRent1BR ? 'text-emerald-600' : 'text-orange-500'}`}>
            {sc.maxRent >= marketData.avgRent1BR ? '↑ Above' : '↓ Below'} avg {fmt(marketData.avgRent1BR)}/mo in your area
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-1">Max Home Price</div>
          <div className={`text-2xl font-black tabular-nums ${S.accentClass}`}>
            {fmt(sc.affordableHomePrice)}
          </div>
          <div className={`text-xs mt-1 font-medium ${sc.affordableHomePrice >= marketData.avgHomePrice ? 'text-emerald-600' : 'text-orange-500'}`}>
            {sc.affordableHomePrice >= marketData.avgHomePrice ? '↑ Above' : '↓ Below'} avg {fmt(marketData.avgHomePrice)} in your area
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center">
            Monthly Mortgage Breakdown
            <Tooltip text="PITI = Principal, Interest, Taxes & Insurance — the true monthly cost of owning a home." />
          </h4>
          <span className={`text-sm font-bold tabular-nums ${S.accentClass}`}>{fmt(total)}/mo</span>
        </div>

        <BarRow
          label="Principal & Interest"
          tooltip="The part that pays down the loan (principal) plus the lender's fee (interest). Early payments are mostly interest."
          value={fmt(sc.monthlyPI)}
          barPct={(sc.monthlyPI / total) * 100}
          barColor="bg-slate-800"
        />
        <BarRow
          label="Property Tax"
          tooltip="Charged by local government based on home value. Collected monthly and paid to the county by your lender."
          value={fmt(sc.monthlyTax)}
          barPct={(sc.monthlyTax / total) * 100}
          barColor="bg-slate-400"
        />
        <BarRow
          label="Homeowner Insurance"
          tooltip="Required by lenders. Protects against fire, storms, theft. Typically 0.5–1% of home value per year."
          value={fmt(sc.monthlyIns)}
          barPct={(sc.monthlyIns / total) * 100}
          barColor="bg-slate-300"
        />
        {sc.monthlyPMI > 0 && (
          <BarRow
            label="PMI"
            tooltip="Private Mortgage Insurance — required when down payment is under 20%. Protects the lender, not you. Drops off at 20% equity."
            value={fmt(sc.monthlyPMI)}
            barPct={(sc.monthlyPMI / total) * 100}
            barColor="bg-amber-400"
          />
        )}
      </div>

      <div className="bg-slate-50 rounded-lg p-3 grid grid-cols-3 gap-3 text-sm text-center">
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Your Down Payment</div>
          <div className="font-bold text-slate-700 tabular-nums">{fmt(sc.affordableHomePrice - sc.loanAmount)}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5 flex items-center justify-center">
            20% Down (no PMI)
            <Tooltip text="Putting 20% down eliminates PMI and lowers your monthly payment." />
          </div>
          <div className="font-bold text-slate-700 tabular-nums">{fmt(sc.requiredDownPayment20)}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-0.5">Loan Amount</div>
          <div className="font-bold text-slate-700 tabular-nums">{fmt(sc.loanAmount)}</div>
        </div>
      </div>

      {sc.firstTimeBuyer && (
        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
          <span className="font-semibold">First-time buyer:</span> FHA loans allow 3.5% down. Many states offer down payment assistance — search "[your state] first-time buyer program."
        </div>
      )}
    </div>
  );
}
