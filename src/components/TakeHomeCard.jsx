import { fmt, pct } from '../utils/calculations';
import Tooltip from './Tooltip';

function TaxRow({ label, tooltip, value, sub, highlight }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <div>
        <span className="text-sm text-slate-600 flex items-center">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </span>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`text-sm font-semibold tabular-nums ${highlight ? 'text-emerald-600' : 'text-slate-500'}`}>
        {value}
      </span>
    </div>
  );
}

export default function TakeHomeCard({ data }) {
  const {
    grossMonthly,
    federalTax,
    stateTax,
    fica,
    totalTaxes,
    effectiveTaxRate,
    netMonthly,
    grossAnnual,
    netAnnual,
  } = data;

  const fedRate   = grossAnnual > 0 ? (federalTax / grossAnnual) * 100 : 0;
  const stateRate = grossAnnual > 0 ? (stateTax  / grossAnnual) * 100 : 0;
  const keepPct   = grossAnnual > 0 ? Math.round((netAnnual / grossAnnual) * 100) : 0;

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Take-Home Pay</h3>
          <p className="text-xs text-slate-400 mt-0.5">After all 2024 taxes</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-slate-900 tabular-nums">
            {fmt(netMonthly)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">/month · {fmt(netAnnual)}/yr</div>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>You keep {keepPct}%</span>
          <span>Taxes {100 - keepPct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
          <div
            className="h-2 bg-slate-900 rounded-l-full transition-all"
            style={{ width: `${keepPct}%` }}
          />
          <div className="h-2 bg-red-200 flex-1 rounded-r-full" />
        </div>
      </div>

      <TaxRow
        label="Federal Income Tax"
        tooltip="Calculated after the standard deduction, using 2024 marginal brackets."
        value={`–${fmt(federalTax / 12)}/mo`}
        sub={`${pct(fedRate)} effective rate`}
      />
      <TaxRow
        label="State Income Tax"
        tooltip="Nine states have no income tax. Others range from flat 3% to progressive brackets above 13%."
        value={stateTax === 0 ? 'None' : `–${fmt(stateTax / 12)}/mo`}
        sub={stateTax === 0 ? 'No state income tax' : `${pct(stateRate)} effective rate`}
        highlight={stateTax === 0}
      />
      <TaxRow
        label="Payroll Tax (FICA)"
        tooltip="Funds Social Security (6.2%) and Medicare (1.45%). These are flat rates with no deductions."
        value={`–${fmt(fica / 12)}/mo`}
        sub="Social Security 6.2% + Medicare 1.45%"
      />

      <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-100">
        <span className="text-sm text-slate-500 flex items-center">
          Overall effective tax rate
          <Tooltip text="Your effective rate is the actual percentage of total income paid in taxes — much lower than your marginal rate, which only applies to the last dollars earned." />
        </span>
        <span className="text-sm font-bold text-slate-800 tabular-nums">{pct(effectiveTaxRate)}</span>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        Pre-tax 401(k) or HSA contributions lower taxable income and increase your take-home.
      </p>
    </div>
  );
}
