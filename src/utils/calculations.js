import {
  FEDERAL_BRACKETS,
  STANDARD_DEDUCTIONS,
  FICA_RATES,
  STATE_TAX_DATA,
} from '../data/taxData';
import { STATE_DATA } from '../data/stateData';
import { COUNTY_DATA } from '../data/countyData';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function applyBrackets(taxableIncome, brackets) {
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const upper = Math.min(taxableIncome, bracket.max);
    tax += (upper - bracket.min) * bracket.rate;
  }
  return Math.max(0, tax);
}

function filingKey(filingStatus) {
  return filingStatus === 'married' ? 'married' : 'single';
}

// ─── Federal tax ─────────────────────────────────────────────────────────────

function calcFederalTax(grossIncome, filingStatus) {
  const deduction = STANDARD_DEDUCTIONS[filingStatus] ?? STANDARD_DEDUCTIONS.single;
  const taxable = Math.max(0, grossIncome - deduction);
  const brackets = FEDERAL_BRACKETS[filingStatus] ?? FEDERAL_BRACKETS.single;
  return applyBrackets(taxable, brackets);
}

// ─── State tax ───────────────────────────────────────────────────────────────

function calcStateTax(grossIncome, stateCode, filingStatus) {
  const sd = STATE_TAX_DATA[stateCode];
  if (!sd || sd.noTax) return 0;

  const fk = filingKey(filingStatus);
  const deduction = sd.deduction?.[fk] ?? 0;
  const exemption = sd.personalExemption?.[fk] ?? 0;
  const taxable = Math.max(0, grossIncome - deduction - exemption);

  let tax = 0;
  if (sd.flat) {
    tax = taxable * sd.flat;
  } else if (sd.brackets) {
    const brackets = sd.brackets[fk] ?? sd.brackets.single;
    tax = applyBrackets(taxable, brackets);
    if (sd.sdi) tax += grossIncome * sd.sdi; // CA SDI on gross
    if (sd.localTaxRate) tax += taxable * sd.localTaxRate; // MD county
  }

  return Math.max(0, tax);
}

// ─── FICA ─────────────────────────────────────────────────────────────────────

function calcFICA(grossIncome, filingStatus) {
  const ssCapped = Math.min(grossIncome, FICA_RATES.socialSecurityWageCap);
  const ss = ssCapped * FICA_RATES.socialSecurity;
  const medicare = grossIncome * FICA_RATES.medicare;
  const addlThreshold =
    FICA_RATES.additionalMedicareThreshold[filingStatus] ??
    FICA_RATES.additionalMedicareThreshold.single;
  const addlMedicare =
    Math.max(0, grossIncome - addlThreshold) * FICA_RATES.additionalMedicare;

  return {
    socialSecurity: ss,
    medicare: medicare + addlMedicare,
    total: ss + medicare + addlMedicare,
  };
}

// ─── Take-home ────────────────────────────────────────────────────────────────

export function calculateTakeHome(inputs) {
  const { salary, state, filingStatus } = inputs;
  const gross = Number(salary) || 0;

  const federalTax = calcFederalTax(gross, filingStatus);
  const stateTax = calcStateTax(gross, state, filingStatus);
  const fica = calcFICA(gross, filingStatus);
  const totalTaxes = federalTax + stateTax + fica.total;
  const netAnnual = gross - totalTaxes;

  return {
    grossAnnual: gross,
    grossMonthly: gross / 12,
    federalTax,
    stateTax,
    ficaSocialSecurity: fica.socialSecurity,
    ficaMedicare: fica.medicare,
    fica: fica.total,
    totalTaxes,
    effectiveTaxRate: gross > 0 ? (totalTaxes / gross) * 100 : 0,
    netAnnual,
    netMonthly: netAnnual / 12,
  };
}

// ─── Mortgage ─────────────────────────────────────────────────────────────────

function monthlyMortgagePayment(principal, annualRate, termYears = 30) {
  if (principal <= 0) return 0;
  const r = annualRate / 12;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Iteratively find the home price that results in a given PITI budget
function affordableHomePrice(maxPITI, downPaymentAmt, annualRate, propertyTaxRate) {
  if (maxPITI <= 0) return 0;
  const PMI_RATE = 0.007; // annual, charged on loan if < 20% down
  const INS_RATE = 0.005; // homeowner insurance annual rate on home price

  let price = maxPITI * 150; // starting estimate

  for (let i = 0; i < 25; i++) {
    const loan = Math.max(0, price - downPaymentAmt);
    const downPct = price > 0 ? downPaymentAmt / price : 0;
    const pi = monthlyMortgagePayment(loan, annualRate);
    const tax = (price * propertyTaxRate) / 12;
    const ins = (price * INS_RATE) / 12;
    const pmi = downPct < 0.20 ? (loan * PMI_RATE) / 12 : 0;
    const total = pi + tax + ins + pmi;
    if (total <= 0) break;
    const ratio = maxPITI / total;
    if (Math.abs(ratio - 1) < 0.0005) break;
    price = price * ratio;
  }

  return Math.max(0, price);
}

// ─── Housing ─────────────────────────────────────────────────────────────────

export function calculateHousing(takeHome, inputs) {
  const { state, county, downPayment, interestRate, firstTimeBuyer } = inputs;
  const grossMonthly = takeHome.grossMonthly;
  const dpAmt = Number(downPayment) || 0;
  const rate = (Number(interestRate) || 7.25) / 100;

  const stateInfo = STATE_DATA[state] || {};
  const cityInfo = county ? COUNTY_DATA[county] : null;
  const propertyTaxRate = stateInfo.propertyTaxRate || 0.01;
  const avgRent = cityInfo?.avgRent1BR ?? stateInfo.avgRent1BR ?? 1200;
  const avgHomePrice = cityInfo?.avgHomePrice ?? stateInfo.avgHomePrice ?? 350000;

  const SCENARIOS = [
    {
      key: 'conservative',
      label: 'Conservative',
      color: 'emerald',
      housingPct: 0.28,
      desc: '28% rule — traditional guideline',
    },
    {
      key: 'moderate',
      label: 'Moderate',
      color: 'blue',
      housingPct: 0.33,
      desc: '33% of gross — common in most markets',
    },
    {
      key: 'aggressive',
      label: 'Aggressive',
      color: 'orange',
      housingPct: 0.40,
      desc: '40% of gross — high-cost city reality',
    },
  ];

  const scenarios = SCENARIOS.map((sc) => {
    const maxPITI = grossMonthly * sc.housingPct;
    const homePrice = affordableHomePrice(maxPITI, dpAmt, rate, propertyTaxRate);
    const loan = Math.max(0, homePrice - dpAmt);
    const downPct = homePrice > 0 ? (dpAmt / homePrice) * 100 : 0;
    const pi = monthlyMortgagePayment(loan, rate);
    const propTax = (homePrice * propertyTaxRate) / 12;
    const ins = (homePrice * 0.005) / 12;
    const pmi = downPct < 20 ? (loan * 0.007) / 12 : 0;

    return {
      ...sc,
      maxMonthlyHousing: Math.round(maxPITI),
      maxRent: Math.round(maxPITI),
      affordableHomePrice: Math.round(homePrice),
      loanAmount: Math.round(loan),
      downPaymentPct: Math.round(downPct),
      monthlyPI: Math.round(pi),
      monthlyTax: Math.round(propTax),
      monthlyIns: Math.round(ins),
      monthlyPMI: Math.round(pmi),
      totalMonthlyMortgage: Math.round(pi + propTax + ins + pmi),
      requiredDownPayment20: Math.round(homePrice * 0.20),
      firstTimeBuyer,
    };
  });

  return {
    scenarios,
    marketData: {
      avgRent1BR: avgRent,
      avgHomePrice,
      propertyTaxRate: (propertyTaxRate * 100).toFixed(2),
      currentRate: (rate * 100).toFixed(2),
    },
  };
}

// ─── Car ─────────────────────────────────────────────────────────────────────

export function calculateCar(takeHome, inputs) {
  const { state, luxuryCar } = inputs;
  const netMonthly = takeHome.netMonthly;
  const stateInfo = STATE_DATA[state] || {};
  const autoIns = stateInfo.autoInsuranceMonthly ?? 140;
  const gasPrice = stateInfo.gasPrice ?? 3.50;
  const milesPerMonth = 1000;
  const mpg = luxuryCar ? 20 : 28;
  const gasMonthly = Math.round((milesPerMonth / mpg) * gasPrice);
  const maintenance = luxuryCar ? 150 : 80;

  const SCENARIOS = [
    {
      key: 'conservative',
      label: 'Conservative',
      color: 'emerald',
      pct: 0.10,
      desc: '10% of net — low-stress budget',
    },
    {
      key: 'moderate',
      label: 'Moderate',
      color: 'blue',
      pct: 0.15,
      desc: '15% of net — balanced choice',
    },
    {
      key: 'aggressive',
      label: 'Aggressive',
      color: 'orange',
      pct: 0.20,
      desc: '20% of net — stretching the budget',
    },
  ];

  // Loan factor: 5-year at 7%
  const autoRate = 0.07 / 12;
  const n = 60;
  const loanFactor = (autoRate * Math.pow(1 + autoRate, n)) / (Math.pow(1 + autoRate, n) - 1);

  const scenarios = SCENARIOS.map((sc) => {
    const maxPayment = Math.round(netMonthly * sc.pct);
    const vehiclePrice = Math.round(maxPayment / loanFactor);
    const totalMonthly = maxPayment + autoIns + gasMonthly + maintenance;
    return {
      ...sc,
      maxMonthlyPayment: maxPayment,
      estimatedVehiclePrice: vehiclePrice,
      autoInsurance: autoIns,
      gasMonthly,
      maintenance,
      totalMonthly: Math.round(totalMonthly),
    };
  });

  return { scenarios, stateAutoIns: autoIns, gasMonthly };
}

// ─── Budget breakdown ─────────────────────────────────────────────────────────

export function calculateBudget(takeHome, housing, car, inputs) {
  const { aggressiveSaver, highIncome } = inputs;
  const net = takeHome.netMonthly;

  // Use moderate scenario for budget baseline
  const modHousing = housing.scenarios[1].maxRent;
  const modCar = car.scenarios[1].totalMonthly;

  const savingsPct = aggressiveSaver ? 0.20 : highIncome ? 0.15 : 0.10;
  const savings = Math.round(net * savingsPct);
  const food = Math.round(net * 0.12);
  const utilities = Math.round(net * 0.055);
  const healthIns = Math.round(net * 0.055);
  const remaining = net - modHousing - modCar - savings - food - utilities - healthIns;
  const discretionary = Math.max(0, Math.round(remaining));

  return {
    housing: Math.round(modHousing),
    car: Math.round(modCar),
    food,
    utilities,
    healthIns,
    savings,
    discretionary,
    netMonthly: Math.round(net),
  };
}

// ─── Master calculation ───────────────────────────────────────────────────────

export function calculateAll(inputs) {
  const salary = Number(inputs.salary);
  if (!salary || salary <= 0 || !inputs.state) return null;

  const takeHome = calculateTakeHome(inputs);
  const housing = calculateHousing(takeHome, inputs);
  const car = calculateCar(takeHome, inputs);
  const budget = calculateBudget(takeHome, housing, car, inputs);

  return { takeHome, housing, car, budget };
}

// ─── Formatting helpers exported for components ───────────────────────────────

export function fmt(n, opts = {}) {
  const { decimals = 0, prefix = '$' } = opts;
  if (n == null || isNaN(n)) return `${prefix}—`;
  return (
    prefix +
    Math.round(n)
      .toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
  );
}

export function pct(n) {
  if (n == null || isNaN(n)) return '—%';
  return n.toFixed(1) + '%';
}
