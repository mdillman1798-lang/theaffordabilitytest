import TakeHomeCard from './TakeHomeCard';
import HousingCard from './HousingCard';
import CarCard from './CarCard';
import LifestyleCard from './LifestyleCard';
import AffordabilityGauge from './AffordabilityGauge';
import { STATE_DATA } from '../data/stateData';
import { fmt } from '../utils/calculations';

function SummaryBanner({ results, inputs }) {
  const { takeHome, housing, car } = results;
  const stateName = STATE_DATA[inputs.state]?.name ?? inputs.state;
  const location = inputs.county
    ? inputs.county.replace(`, ${inputs.state}`, '') + ', ' + stateName
    : stateName;

  const tags = [
    inputs.filingStatus === 'married' ? 'Married Filing Jointly' : inputs.filingStatus === 'headOfHousehold' ? 'Head of Household' : 'Single',
    inputs.firstTimeBuyer && 'First-Time Buyer',
    inputs.aggressiveSaver && 'Aggressive Saver',
    inputs.luxuryCar && 'Luxury Car',
  ].filter(Boolean);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {fmt(Number(inputs.salary))} in {location}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[
          { label: 'Net / month', value: fmt(takeHome.netMonthly) },
          { label: 'Max rent', value: fmt(housing.scenarios[1].maxRent) },
          { label: 'Max home price', value: fmt(housing.scenarios[1].affordableHomePrice) },
          { label: 'Max vehicle', value: fmt(car.scenarios[1].estimatedVehiclePrice) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div className="text-xs text-slate-400 mb-0.5">{label}</div>
            <div className="text-lg font-black text-slate-900">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResultsSection({ results, inputs }) {
  const { takeHome, housing, car, budget } = results;

  return (
    <div>
      <SummaryBanner results={results} inputs={inputs} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <TakeHomeCard data={takeHome} />
        <AffordabilityGauge
          takeHome={takeHome}
          housing={housing}
          car={car}
          budget={budget}
        />
      </div>

      <div className="mb-5">
        <HousingCard data={housing} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <CarCard data={car} />
        <InsightsCard takeHome={takeHome} housing={housing} car={car} budget={budget} inputs={inputs} />
      </div>

      <div className="mb-5">
        <LifestyleCard budget={budget} inputs={inputs} />
      </div>

      <p className="text-center text-xs text-slate-400 pb-8">
        All figures are estimates for educational purposes. Tax data reflects 2024 rates. Housing data reflects approximate 2024 market averages.
      </p>
    </div>
  );
}

function InsightsCard({ takeHome, housing, car, budget, inputs }) {
  const insights = generateInsights(takeHome, housing, car, budget, inputs);
  return (
    <div className="card flex flex-col">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Quick Insights</h3>
      <div className="space-y-3 flex-1">
        {insights.map((tip, i) => (
          <div key={i} className={`p-3 rounded-lg border-l-2 bg-slate-50 ${tip.accent}`}>
            <div className="text-xs font-semibold text-slate-700 mb-0.5">{tip.title}</div>
            <div className="text-xs text-slate-500 leading-relaxed">{tip.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateInsights(takeHome, housing, car, budget, inputs) {
  const tips = [];
  const net = takeHome.netMonthly;
  const gross = takeHome.grossMonthly;
  const effRate = takeHome.effectiveTaxRate;
  const modHousing = housing.scenarios[1];
  const discr = budget.discretionary;

  if (effRate > 30) {
    tips.push({
      title: `${effRate.toFixed(1)}% effective tax rate`,
      body: `Pre-tax contributions (401k, HSA) could meaningfully reduce this. Max these out before investing in taxable accounts.`,
      accent: 'border-amber-400',
    });
  } else if (effRate < 18) {
    tips.push({
      title: `${effRate.toFixed(1)}% effective tax rate — favorable`,
      body: `Consider a Roth IRA while your bracket is lower. Roth grows tax-free and withdrawals in retirement are untaxed.`,
      accent: 'border-emerald-400',
    });
  } else {
    tips.push({
      title: `${effRate.toFixed(1)}% effective tax rate`,
      body: `Pre-tax 401(k) contributions can shift you to a lower bracket and increase your net monthly pay.`,
      accent: 'border-slate-300',
    });
  }

  if (modHousing.affordableHomePrice < housing.marketData.avgHomePrice) {
    const gap = housing.marketData.avgHomePrice - modHousing.affordableHomePrice;
    tips.push({
      title: 'Challenging housing market',
      body: `Average home prices are ${fmt(gap)} above your moderate budget. Nearby suburbs or renting longer are worth considering.`,
      accent: 'border-orange-400',
    });
  } else {
    tips.push({
      title: 'Buying is within reach',
      body: `Your moderate budget covers the average home price here. Aim for 20% down to avoid PMI.`,
      accent: 'border-emerald-400',
    });
  }

  const dpAmt = Number(inputs.downPayment) || 0;
  const needed20 = modHousing.requiredDownPayment20;
  if (dpAmt > 0 && dpAmt < needed20) {
    const shortfall = needed20 - dpAmt;
    tips.push({
      title: 'Down payment gap',
      body: `You need ${fmt(shortfall)} more for 20% down. Until then, budget for PMI (~${fmt(modHousing.monthlyPMI)}/mo).`,
      accent: 'border-amber-400',
    });
  } else if (dpAmt >= needed20) {
    tips.push({
      title: 'Strong down payment',
      body: `Your ${fmt(dpAmt)} covers 20% down on a moderate home — no PMI required.`,
      accent: 'border-emerald-400',
    });
  }

  if (discr < 0) {
    tips.push({
      title: 'Budget is stretched',
      body: 'At moderate spending, you\'re over budget. Reducing car costs or choosing a cheaper housing option will create breathing room.',
      accent: 'border-red-400',
    });
  } else if (discr > net * 0.25) {
    tips.push({
      title: `${fmt(discr)}/mo surplus after essentials`,
      body: `Strong position. Accelerate savings, invest, or pay down debt faster.`,
      accent: 'border-emerald-400',
    });
  } else {
    tips.push({
      title: `${fmt(discr)}/mo discretionary`,
      body: `After housing, car, and essentials — enough for lifestyle spending while maintaining savings.`,
      accent: 'border-slate-300',
    });
  }

  const debtMonthly = Number(inputs.monthlyDebt) || 0;
  if (debtMonthly > 0) {
    const dti = ((modHousing.totalMonthlyMortgage + debtMonthly) / gross) * 100;
    tips.push({
      title: `Debt-to-income: ${dti.toFixed(1)}%`,
      body: dti > 43
        ? `Above 43% — lenders may limit your mortgage options. Paying down existing debt will expand your buying power.`
        : `Within acceptable range. Most lenders require ≤43% for qualified mortgages.`,
      accent: dti > 43 ? 'border-red-400' : 'border-emerald-400',
    });
  }

  return tips.slice(0, 5);
}
