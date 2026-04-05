import { STATE_LIST } from '../data/stateData';
import { getCountiesForState } from '../data/countyData';

const FILING_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'headOfHousehold', label: 'Head of Household' },
];

const CREDIT_OPTIONS = [
  { value: 'exceptional', label: 'Exceptional (800+)' },
  { value: 'very_good', label: 'Very Good (740–799)' },
  { value: 'good', label: 'Good (670–739)' },
  { value: 'fair', label: 'Fair (580–669)' },
  { value: 'poor', label: 'Poor (below 580)' },
];

// Approximate 30-yr fixed rates by credit tier (2024 averages)
const CREDIT_RATE_MAP = {
  exceptional: { rate: '6.75', label: '~6.75%', note: 'Best available rates' },
  very_good:   { rate: '7.00', label: '~7.00%', note: 'Near-best rates' },
  good:        { rate: '7.25', label: '~7.25%', note: 'Standard rates' },
  fair:        { rate: '7.75', label: '~7.75%', note: 'Above-average rates' },
  poor:        { rate: '8.50', label: '~8.50%', note: 'Subprime range — consider FHA' },
};

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150 w-full
        ${checked
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
        }`}
    >
      <div className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 transition-colors flex items-center justify-center
        ${checked ? 'bg-white border-white' : 'border-slate-300'}`}>
        {checked && <div className="w-2 h-2 rounded-sm bg-slate-900" />}
      </div>
      <div>
        <div className="font-medium text-sm leading-tight">{label}</div>
        {description && (
          <p className={`text-xs mt-0.5 ${checked ? 'text-slate-300' : 'text-slate-400'}`}>{description}</p>
        )}
      </div>
    </button>
  );
}

export default function InputForm({ inputs, onChange, onCalculate }) {
  const counties = inputs.state ? getCountiesForState(inputs.state) : [];

  function set(field, value) {
    const updated = { ...inputs, [field]: value };
    if (field === 'state') updated.county = '';
    // Auto-suggest mortgage rate when credit score changes
    if (field === 'creditScore') {
      updated.interestRate = CREDIT_RATE_MAP[value]?.rate ?? updated.interestRate;
    }
    onChange(updated);
  }

  const creditRateInfo = CREDIT_RATE_MAP[inputs.creditScore];

  return (
    <div className="card mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="label">Annual Salary</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              type="number"
              placeholder="75,000"
              value={inputs.salary}
              onChange={(e) => set('salary', e.target.value)}
              className="input-field pl-7"
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div>
          <label className="label">State</label>
          <select
            value={inputs.state}
            onChange={(e) => set('state', e.target.value)}
            className="input-field"
          >
            <option value="">Select a state…</option>
            {STATE_LIST.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">County <span className="text-slate-300 normal-case font-normal">(optional)</span></label>
          <select
            value={inputs.county}
            onChange={(e) => set('county', e.target.value)}
            className="input-field"
            disabled={!inputs.state}
          >
            <option value="">{inputs.state ? 'All counties (state avg)' : 'Select state first'}</option>
            {counties.map((c) => (
              <option key={c} value={c}>{c.replace(`, ${inputs.state}`, '')}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Filing Status</label>
          <select
            value={inputs.filingStatus}
            onChange={(e) => set('filingStatus', e.target.value)}
            className="input-field"
          >
            {FILING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="label">Down Payment <span className="text-slate-300 normal-case font-normal">(optional)</span></label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              type="number"
              placeholder="30,000"
              value={inputs.downPayment}
              onChange={(e) => set('downPayment', e.target.value)}
              className="input-field pl-7"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Cash saved for a home purchase</p>
        </div>

        <div>
          <label className="label">Monthly Debt <span className="text-slate-300 normal-case font-normal">(optional)</span></label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
            <input
              type="number"
              placeholder="300"
              value={inputs.monthlyDebt}
              onChange={(e) => set('monthlyDebt', e.target.value)}
              className="input-field pl-7"
              min="0"
              step="50"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Student loans, credit cards, etc.</p>
        </div>

        <div>
          <label className="label">Credit Score <span className="text-slate-300 normal-case font-normal">(optional)</span></label>
          <select
            value={inputs.creditScore}
            onChange={(e) => set('creditScore', e.target.value)}
            className="input-field"
          >
            {CREDIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">Affects mortgage & auto rates</p>
        </div>

        <div>
          <label className="label">Mortgage Rate (%)</label>
          <input
            type="number"
            placeholder="7.25"
            value={inputs.interestRate}
            onChange={(e) => set('interestRate', e.target.value)}
            className="input-field"
            min="2"
            max="15"
            step="0.25"
          />
          {creditRateInfo && (
            <p className="text-xs mt-1">
              <span className="text-slate-500 font-medium">{creditRateInfo.label} estimated</span>
              <span className="text-slate-400"> · {creditRateInfo.note}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="label mb-2">Options</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Toggle
            checked={inputs.firstTimeBuyer}
            onChange={(v) => set('firstTimeBuyer', v)}
            label="First-Time Buyer"
            description="Lower down payment programs"
          />
          <Toggle
            checked={inputs.highIncome}
            onChange={(v) => set('highIncome', v)}
            label="High Income"
            description="Optimized for higher earners"
          />
          <Toggle
            checked={inputs.aggressiveSaver}
            onChange={(v) => set('aggressiveSaver', v)}
            label="Aggressive Saver"
            description="Prioritize 20%+ savings rate"
          />
          <Toggle
            checked={inputs.luxuryCar}
            onChange={(v) => set('luxuryCar', v)}
            label="Luxury Car"
            description="Higher insurance & fuel costs"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onCalculate}
          disabled={!inputs.salary || !inputs.state}
          className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}
