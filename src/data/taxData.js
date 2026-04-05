// Federal tax brackets 2024
export const FEDERAL_BRACKETS = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

export const STANDARD_DEDUCTIONS = {
  single: 14600,
  married: 29200,
  headOfHousehold: 21900,
};

export const FICA_RATES = {
  socialSecurity: 0.062,
  socialSecurityWageCap: 168600,
  medicare: 0.0145,
  additionalMedicare: 0.009,
  additionalMedicareThreshold: {
    single: 200000,
    married: 250000,
    headOfHousehold: 200000,
  },
};

// State income tax data - 2024 rates
// Format: noTax | flat rate | progressive brackets
// deduction: state standard deduction
// personalExemption: personal exemption amount
export const STATE_TAX_DATA = {
  AL: {
    name: 'Alabama',
    brackets: {
      single: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: Infinity, rate: 0.05 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 6000, rate: 0.04 },
        { min: 6000, max: Infinity, rate: 0.05 },
      ],
    },
    deduction: { single: 2500, married: 7500 },
    personalExemption: { single: 1500, married: 3000 },
  },
  AK: { name: 'Alaska', noTax: true },
  AZ: {
    name: 'Arizona',
    flat: 0.025,
    deduction: { single: 12900, married: 25800 },
  },
  AR: {
    name: 'Arkansas',
    brackets: {
      single: [
        { min: 0, max: 5099, rate: 0.02 },
        { min: 5099, max: 10299, rate: 0.04 },
        { min: 10299, max: Infinity, rate: 0.047 },
      ],
      married: [
        { min: 0, max: 5099, rate: 0.02 },
        { min: 5099, max: 10299, rate: 0.04 },
        { min: 10299, max: Infinity, rate: 0.047 },
      ],
    },
    deduction: { single: 2200, married: 4400 },
  },
  CA: {
    name: 'California',
    brackets: {
      single: [
        { min: 0, max: 10412, rate: 0.01 },
        { min: 10412, max: 24684, rate: 0.02 },
        { min: 24684, max: 38959, rate: 0.04 },
        { min: 38959, max: 54081, rate: 0.06 },
        { min: 54081, max: 68350, rate: 0.08 },
        { min: 68350, max: 349137, rate: 0.093 },
        { min: 349137, max: 418961, rate: 0.103 },
        { min: 418961, max: 698271, rate: 0.113 },
        { min: 698271, max: 1000000, rate: 0.123 },
        { min: 1000000, max: Infinity, rate: 0.133 },
      ],
      married: [
        { min: 0, max: 20824, rate: 0.01 },
        { min: 20824, max: 49368, rate: 0.02 },
        { min: 49368, max: 77918, rate: 0.04 },
        { min: 77918, max: 108162, rate: 0.06 },
        { min: 108162, max: 136700, rate: 0.08 },
        { min: 136700, max: 698274, rate: 0.093 },
        { min: 698274, max: 837922, rate: 0.103 },
        { min: 837922, max: 1396542, rate: 0.113 },
        { min: 1396542, max: Infinity, rate: 0.133 },
      ],
    },
    deduction: { single: 4601, married: 9202 },
    sdi: 0.009,
  },
  CO: {
    name: 'Colorado',
    flat: 0.044,
    deduction: { single: 14600, married: 29200 },
  },
  CT: {
    name: 'Connecticut',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 50000, rate: 0.05 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: Infinity, rate: 0.0699 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.03 },
        { min: 20000, max: 100000, rate: 0.05 },
        { min: 100000, max: 200000, rate: 0.055 },
        { min: 200000, max: 400000, rate: 0.06 },
        { min: 400000, max: 500000, rate: 0.065 },
        { min: 500000, max: 1000000, rate: 0.069 },
        { min: 1000000, max: Infinity, rate: 0.0699 },
      ],
    },
    deduction: { single: 0, married: 0 },
  },
  DE: {
    name: 'Delaware',
    brackets: {
      single: [
        { min: 0, max: 2000, rate: 0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
    },
    deduction: { single: 3250, married: 6500 },
    personalExemption: { single: 110, married: 220 },
  },
  FL: { name: 'Florida', noTax: true },
  GA: {
    name: 'Georgia',
    flat: 0.0549,
    deduction: { single: 12000, married: 24000 },
  },
  HI: {
    name: 'Hawaii',
    brackets: {
      single: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.10 },
        { min: 200000, max: Infinity, rate: 0.11 },
      ],
      married: [
        { min: 0, max: 4800, rate: 0.014 },
        { min: 4800, max: 9600, rate: 0.032 },
        { min: 9600, max: 19200, rate: 0.055 },
        { min: 19200, max: 28800, rate: 0.064 },
        { min: 28800, max: 38400, rate: 0.068 },
        { min: 38400, max: 48000, rate: 0.072 },
        { min: 48000, max: 72000, rate: 0.076 },
        { min: 72000, max: 96000, rate: 0.079 },
        { min: 96000, max: 300000, rate: 0.0825 },
        { min: 300000, max: 350000, rate: 0.09 },
        { min: 350000, max: 400000, rate: 0.10 },
        { min: 400000, max: Infinity, rate: 0.11 },
      ],
    },
    deduction: { single: 2200, married: 4400 },
  },
  ID: {
    name: 'Idaho',
    flat: 0.058,
    deduction: { single: 14600, married: 29200 },
  },
  IL: {
    name: 'Illinois',
    flat: 0.0495,
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 2425, married: 4850 },
  },
  IN: {
    name: 'Indiana',
    flat: 0.0305,
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 1000, married: 2000 },
  },
  IA: {
    name: 'Iowa',
    flat: 0.06,
    deduction: { single: 14600, married: 29200 },
  },
  KS: {
    name: 'Kansas',
    brackets: {
      single: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: Infinity, rate: 0.057 },
      ],
      married: [
        { min: 0, max: 30000, rate: 0.031 },
        { min: 30000, max: 60000, rate: 0.0525 },
        { min: 60000, max: Infinity, rate: 0.057 },
      ],
    },
    deduction: { single: 3500, married: 8000 },
    personalExemption: { single: 2250, married: 4500 },
  },
  KY: {
    name: 'Kentucky',
    flat: 0.045,
    deduction: { single: 2980, married: 5960 },
  },
  LA: {
    name: 'Louisiana',
    brackets: {
      single: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: Infinity, rate: 0.0425 },
      ],
      married: [
        { min: 0, max: 25000, rate: 0.0185 },
        { min: 25000, max: 100000, rate: 0.035 },
        { min: 100000, max: Infinity, rate: 0.0425 },
      ],
    },
    deduction: { single: 4500, married: 9000 },
    personalExemption: { single: 4500, married: 9000 },
  },
  ME: {
    name: 'Maine',
    brackets: {
      single: [
        { min: 0, max: 24500, rate: 0.058 },
        { min: 24500, max: 58050, rate: 0.0675 },
        { min: 58050, max: Infinity, rate: 0.0715 },
      ],
      married: [
        { min: 0, max: 49050, rate: 0.058 },
        { min: 49050, max: 116100, rate: 0.0675 },
        { min: 116100, max: Infinity, rate: 0.0715 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  MD: {
    name: 'Maryland',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: Infinity, rate: 0.0575 },
      ],
    },
    deduction: { single: 2400, married: 4850 },
    localTaxRate: 0.0303,
  },
  MA: {
    name: 'Massachusetts',
    brackets: {
      single: [
        { min: 0, max: 1000000, rate: 0.05 },
        { min: 1000000, max: Infinity, rate: 0.09 },
      ],
      married: [
        { min: 0, max: 1000000, rate: 0.05 },
        { min: 1000000, max: Infinity, rate: 0.09 },
      ],
    },
    deduction: { single: 4400, married: 8800 },
    personalExemption: { single: 4400, married: 8800 },
  },
  MI: {
    name: 'Michigan',
    flat: 0.0425,
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 5000, married: 10000 },
  },
  MN: {
    name: 'Minnesota',
    brackets: {
      single: [
        { min: 0, max: 30070, rate: 0.0535 },
        { min: 30070, max: 98760, rate: 0.068 },
        { min: 98760, max: 183340, rate: 0.0785 },
        { min: 183340, max: Infinity, rate: 0.0985 },
      ],
      married: [
        { min: 0, max: 43950, rate: 0.0535 },
        { min: 43950, max: 174610, rate: 0.068 },
        { min: 174610, max: 304970, rate: 0.0785 },
        { min: 304970, max: Infinity, rate: 0.0985 },
      ],
    },
    deduction: { single: 14575, married: 29150 },
  },
  MS: {
    name: 'Mississippi',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0 },
        { min: 10000, max: Infinity, rate: 0.05 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.0 },
        { min: 10000, max: Infinity, rate: 0.05 },
      ],
    },
    deduction: { single: 2300, married: 4600 },
    personalExemption: { single: 6000, married: 12000 },
  },
  MO: {
    name: 'Missouri',
    brackets: {
      single: [
        { min: 0, max: 1207, rate: 0.015 },
        { min: 1207, max: 2414, rate: 0.02 },
        { min: 2414, max: 3621, rate: 0.025 },
        { min: 3621, max: 4828, rate: 0.03 },
        { min: 4828, max: 6035, rate: 0.035 },
        { min: 6035, max: 7242, rate: 0.04 },
        { min: 7242, max: 8432, rate: 0.045 },
        { min: 8432, max: Infinity, rate: 0.0495 },
      ],
      married: [
        { min: 0, max: 1207, rate: 0.015 },
        { min: 1207, max: 2414, rate: 0.02 },
        { min: 2414, max: 3621, rate: 0.025 },
        { min: 3621, max: 4828, rate: 0.03 },
        { min: 4828, max: 6035, rate: 0.035 },
        { min: 6035, max: 7242, rate: 0.04 },
        { min: 7242, max: 8432, rate: 0.045 },
        { min: 8432, max: Infinity, rate: 0.0495 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  MT: {
    name: 'Montana',
    brackets: {
      single: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 41000, rate: 0.047 },
        { min: 41000, max: Infinity, rate: 0.059 },
      ],
    },
    deduction: { single: 5540, married: 11080 },
  },
  NE: {
    name: 'Nebraska',
    brackets: {
      single: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 35730, rate: 0.0501 },
        { min: 35730, max: Infinity, rate: 0.0664 },
      ],
      married: [
        { min: 0, max: 7390, rate: 0.0246 },
        { min: 7390, max: 44350, rate: 0.0351 },
        { min: 44350, max: 71460, rate: 0.0501 },
        { min: 71460, max: Infinity, rate: 0.0664 },
      ],
    },
    deduction: { single: 7900, married: 15800 },
    personalExemption: { single: 157, married: 314 },
  },
  NV: { name: 'Nevada', noTax: true },
  NH: { name: 'New Hampshire', noTax: true },
  NJ: {
    name: 'New Jersey',
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
    },
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 1000, married: 2000 },
  },
  NM: {
    name: 'New Mexico',
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: Infinity, rate: 0.059 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  NY: {
    name: 'New York',
    brackets: {
      single: [
        { min: 0, max: 8500, rate: 0.04 },
        { min: 8500, max: 11700, rate: 0.045 },
        { min: 11700, max: 13900, rate: 0.0525 },
        { min: 13900, max: 80650, rate: 0.055 },
        { min: 80650, max: 215400, rate: 0.06 },
        { min: 215400, max: 1077550, rate: 0.0685 },
        { min: 1077550, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: Infinity, rate: 0.109 },
      ],
      married: [
        { min: 0, max: 17150, rate: 0.04 },
        { min: 17150, max: 23600, rate: 0.045 },
        { min: 23600, max: 27900, rate: 0.0525 },
        { min: 27900, max: 161550, rate: 0.055 },
        { min: 161550, max: 323200, rate: 0.06 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: Infinity, rate: 0.109 },
      ],
    },
    deduction: { single: 8000, married: 16050 },
  },
  NC: {
    name: 'North Carolina',
    flat: 0.0475,
    deduction: { single: 12750, married: 25500 },
  },
  ND: {
    name: 'North Dakota',
    brackets: {
      single: [
        { min: 0, max: 44725, rate: 0.011 },
        { min: 44725, max: 225975, rate: 0.0204 },
        { min: 225975, max: Infinity, rate: 0.029 },
      ],
      married: [
        { min: 0, max: 74750, rate: 0.011 },
        { min: 74750, max: 275100, rate: 0.0204 },
        { min: 275100, max: Infinity, rate: 0.029 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  OH: {
    name: 'Ohio',
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0 },
        { min: 26050, max: 100000, rate: 0.02765 },
        { min: 100000, max: Infinity, rate: 0.0399 },
      ],
      married: [
        { min: 0, max: 26050, rate: 0 },
        { min: 26050, max: 100000, rate: 0.02765 },
        { min: 100000, max: Infinity, rate: 0.0399 },
      ],
    },
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 2400, married: 4800 },
  },
  OK: {
    name: 'Oklahoma',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: Infinity, rate: 0.0475 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: Infinity, rate: 0.0475 },
      ],
    },
    deduction: { single: 6350, married: 12700 },
  },
  OR: {
    name: 'Oregon',
    brackets: {
      single: [
        { min: 0, max: 4050, rate: 0.0475 },
        { min: 4050, max: 10200, rate: 0.0675 },
        { min: 10200, max: 125000, rate: 0.0875 },
        { min: 125000, max: Infinity, rate: 0.099 },
      ],
      married: [
        { min: 0, max: 8100, rate: 0.0475 },
        { min: 8100, max: 20400, rate: 0.0675 },
        { min: 20400, max: 250000, rate: 0.0875 },
        { min: 250000, max: Infinity, rate: 0.099 },
      ],
    },
    deduction: { single: 2420, married: 4840 },
  },
  PA: {
    name: 'Pennsylvania',
    flat: 0.0307,
    deduction: { single: 0, married: 0 },
  },
  RI: {
    name: 'Rhode Island',
    brackets: {
      single: [
        { min: 0, max: 73450, rate: 0.0375 },
        { min: 73450, max: 166950, rate: 0.0475 },
        { min: 166950, max: Infinity, rate: 0.0599 },
      ],
      married: [
        { min: 0, max: 73450, rate: 0.0375 },
        { min: 73450, max: 166950, rate: 0.0475 },
        { min: 166950, max: Infinity, rate: 0.0599 },
      ],
    },
    deduction: { single: 9300, married: 18600 },
  },
  SC: {
    name: 'South Carolina',
    brackets: {
      single: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: Infinity, rate: 0.065 },
      ],
      married: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 17330, rate: 0.03 },
        { min: 17330, max: Infinity, rate: 0.065 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  SD: { name: 'South Dakota', noTax: true },
  TN: { name: 'Tennessee', noTax: true },
  TX: { name: 'Texas', noTax: true },
  UT: {
    name: 'Utah',
    flat: 0.0465,
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 1966, married: 3932 },
  },
  VT: {
    name: 'Vermont',
    brackets: {
      single: [
        { min: 0, max: 45400, rate: 0.0335 },
        { min: 45400, max: 110050, rate: 0.066 },
        { min: 110050, max: 229550, rate: 0.076 },
        { min: 229550, max: Infinity, rate: 0.0875 },
      ],
      married: [
        { min: 0, max: 75850, rate: 0.0335 },
        { min: 75850, max: 183400, rate: 0.066 },
        { min: 183400, max: 279450, rate: 0.076 },
        { min: 279450, max: Infinity, rate: 0.0875 },
      ],
    },
    deduction: { single: 14600, married: 29200 },
  },
  VA: {
    name: 'Virginia',
    brackets: {
      single: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
    },
    deduction: { single: 8000, married: 16000 },
    personalExemption: { single: 930, married: 1860 },
  },
  WA: { name: 'Washington', noTax: true },
  WV: {
    name: 'West Virginia',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 25000, rate: 0.04 },
        { min: 25000, max: 40000, rate: 0.045 },
        { min: 40000, max: 60000, rate: 0.06 },
        { min: 60000, max: Infinity, rate: 0.065 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 25000, rate: 0.04 },
        { min: 25000, max: 40000, rate: 0.045 },
        { min: 40000, max: 60000, rate: 0.06 },
        { min: 60000, max: Infinity, rate: 0.065 },
      ],
    },
    deduction: { single: 0, married: 0 },
    personalExemption: { single: 2000, married: 4000 },
  },
  WI: {
    name: 'Wisconsin',
    brackets: {
      single: [
        { min: 0, max: 14320, rate: 0.0354 },
        { min: 14320, max: 28640, rate: 0.0465 },
        { min: 28640, max: 315310, rate: 0.053 },
        { min: 315310, max: Infinity, rate: 0.0765 },
      ],
      married: [
        { min: 0, max: 19090, rate: 0.0354 },
        { min: 19090, max: 38190, rate: 0.0465 },
        { min: 38190, max: 420420, rate: 0.053 },
        { min: 420420, max: Infinity, rate: 0.0765 },
      ],
    },
    deduction: { single: 12400, married: 24800 },
  },
  WY: { name: 'Wyoming', noTax: true },
  DC: {
    name: 'Washington DC',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 250000, rate: 0.085 },
        { min: 250000, max: 500000, rate: 0.0925 },
        { min: 500000, max: 1000000, rate: 0.0975 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
    },
    deduction: { single: 12950, married: 25900 },
  },
};
