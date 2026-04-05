// State-level housing, insurance, and cost-of-living data (approximate 2024)
// avgRent1BR: average 1BR rent in dollars
// avgHomePrice: median home price in dollars
// propertyTaxRate: effective annual property tax rate (decimal)
// autoInsuranceMonthly: average monthly auto insurance premium
// gasPrice: average gas price per gallon
export const STATE_DATA = {
  AL: { name: 'Alabama',        avgRent1BR: 900,   avgHomePrice: 225000,  propertyTaxRate: 0.0039, autoInsuranceMonthly: 130, gasPrice: 3.10 },
  AK: { name: 'Alaska',         avgRent1BR: 1200,  avgHomePrice: 340000,  propertyTaxRate: 0.0099, autoInsuranceMonthly: 120, gasPrice: 3.80 },
  AZ: { name: 'Arizona',        avgRent1BR: 1300,  avgHomePrice: 415000,  propertyTaxRate: 0.0062, autoInsuranceMonthly: 132, gasPrice: 3.50 },
  AR: { name: 'Arkansas',       avgRent1BR: 850,   avgHomePrice: 205000,  propertyTaxRate: 0.0061, autoInsuranceMonthly: 128, gasPrice: 3.00 },
  CA: { name: 'California',     avgRent1BR: 1900,  avgHomePrice: 750000,  propertyTaxRate: 0.0075, autoInsuranceMonthly: 175, gasPrice: 4.60 },
  CO: { name: 'Colorado',       avgRent1BR: 1600,  avgHomePrice: 560000,  propertyTaxRate: 0.0051, autoInsuranceMonthly: 145, gasPrice: 3.40 },
  CT: { name: 'Connecticut',    avgRent1BR: 1600,  avgHomePrice: 390000,  propertyTaxRate: 0.0214, autoInsuranceMonthly: 150, gasPrice: 3.60 },
  DE: { name: 'Delaware',       avgRent1BR: 1250,  avgHomePrice: 320000,  propertyTaxRate: 0.0057, autoInsuranceMonthly: 120, gasPrice: 3.30 },
  FL: { name: 'Florida',        avgRent1BR: 1700,  avgHomePrice: 420000,  propertyTaxRate: 0.0083, autoInsuranceMonthly: 205, gasPrice: 3.30 },
  GA: { name: 'Georgia',        avgRent1BR: 1200,  avgHomePrice: 330000,  propertyTaxRate: 0.0092, autoInsuranceMonthly: 155, gasPrice: 3.10 },
  HI: { name: 'Hawaii',         avgRent1BR: 1850,  avgHomePrice: 820000,  propertyTaxRate: 0.0028, autoInsuranceMonthly: 115, gasPrice: 4.80 },
  ID: { name: 'Idaho',          avgRent1BR: 1100,  avgHomePrice: 430000,  propertyTaxRate: 0.0064, autoInsuranceMonthly: 90,  gasPrice: 3.40 },
  IL: { name: 'Illinois',       avgRent1BR: 1200,  avgHomePrice: 270000,  propertyTaxRate: 0.0223, autoInsuranceMonthly: 145, gasPrice: 3.50 },
  IN: { name: 'Indiana',        avgRent1BR: 950,   avgHomePrice: 235000,  propertyTaxRate: 0.0087, autoInsuranceMonthly: 120, gasPrice: 3.20 },
  IA: { name: 'Iowa',           avgRent1BR: 950,   avgHomePrice: 205000,  propertyTaxRate: 0.0152, autoInsuranceMonthly: 115, gasPrice: 3.20 },
  KS: { name: 'Kansas',         avgRent1BR: 950,   avgHomePrice: 215000,  propertyTaxRate: 0.0141, autoInsuranceMonthly: 120, gasPrice: 3.10 },
  KY: { name: 'Kentucky',       avgRent1BR: 950,   avgHomePrice: 205000,  propertyTaxRate: 0.0086, autoInsuranceMonthly: 125, gasPrice: 3.10 },
  LA: { name: 'Louisiana',      avgRent1BR: 1000,  avgHomePrice: 225000,  propertyTaxRate: 0.0055, autoInsuranceMonthly: 200, gasPrice: 3.00 },
  ME: { name: 'Maine',          avgRent1BR: 1200,  avgHomePrice: 355000,  propertyTaxRate: 0.0136, autoInsuranceMonthly: 105, gasPrice: 3.50 },
  MD: { name: 'Maryland',       avgRent1BR: 1600,  avgHomePrice: 425000,  propertyTaxRate: 0.0109, autoInsuranceMonthly: 145, gasPrice: 3.40 },
  MA: { name: 'Massachusetts',  avgRent1BR: 2200,  avgHomePrice: 610000,  propertyTaxRate: 0.0120, autoInsuranceMonthly: 145, gasPrice: 3.50 },
  MI: { name: 'Michigan',       avgRent1BR: 1050,  avgHomePrice: 255000,  propertyTaxRate: 0.0154, autoInsuranceMonthly: 175, gasPrice: 3.30 },
  MN: { name: 'Minnesota',      avgRent1BR: 1200,  avgHomePrice: 340000,  propertyTaxRate: 0.0102, autoInsuranceMonthly: 115, gasPrice: 3.30 },
  MS: { name: 'Mississippi',    avgRent1BR: 850,   avgHomePrice: 180000,  propertyTaxRate: 0.0064, autoInsuranceMonthly: 140, gasPrice: 3.00 },
  MO: { name: 'Missouri',       avgRent1BR: 1000,  avgHomePrice: 225000,  propertyTaxRate: 0.0101, autoInsuranceMonthly: 135, gasPrice: 3.10 },
  MT: { name: 'Montana',        avgRent1BR: 1100,  avgHomePrice: 410000,  propertyTaxRate: 0.0074, autoInsuranceMonthly: 100, gasPrice: 3.50 },
  NE: { name: 'Nebraska',       avgRent1BR: 1000,  avgHomePrice: 255000,  propertyTaxRate: 0.0173, autoInsuranceMonthly: 115, gasPrice: 3.20 },
  NV: { name: 'Nevada',         avgRent1BR: 1400,  avgHomePrice: 430000,  propertyTaxRate: 0.0055, autoInsuranceMonthly: 162, gasPrice: 3.80 },
  NH: { name: 'New Hampshire',  avgRent1BR: 1450,  avgHomePrice: 450000,  propertyTaxRate: 0.0209, autoInsuranceMonthly: 105, gasPrice: 3.50 },
  NJ: { name: 'New Jersey',     avgRent1BR: 1850,  avgHomePrice: 530000,  propertyTaxRate: 0.0249, autoInsuranceMonthly: 155, gasPrice: 3.40 },
  NM: { name: 'New Mexico',     avgRent1BR: 1000,  avgHomePrice: 285000,  propertyTaxRate: 0.0066, autoInsuranceMonthly: 130, gasPrice: 3.20 },
  NY: { name: 'New York',       avgRent1BR: 2000,  avgHomePrice: 460000,  propertyTaxRate: 0.0172, autoInsuranceMonthly: 178, gasPrice: 3.60 },
  NC: { name: 'North Carolina', avgRent1BR: 1200,  avgHomePrice: 325000,  propertyTaxRate: 0.0084, autoInsuranceMonthly: 122, gasPrice: 3.10 },
  ND: { name: 'North Dakota',   avgRent1BR: 900,   avgHomePrice: 250000,  propertyTaxRate: 0.0098, autoInsuranceMonthly: 110, gasPrice: 3.20 },
  OH: { name: 'Ohio',           avgRent1BR: 1000,  avgHomePrice: 220000,  propertyTaxRate: 0.0162, autoInsuranceMonthly: 120, gasPrice: 3.30 },
  OK: { name: 'Oklahoma',       avgRent1BR: 900,   avgHomePrice: 200000,  propertyTaxRate: 0.0090, autoInsuranceMonthly: 150, gasPrice: 3.00 },
  OR: { name: 'Oregon',         avgRent1BR: 1400,  avgHomePrice: 490000,  propertyTaxRate: 0.0091, autoInsuranceMonthly: 112, gasPrice: 3.80 },
  PA: { name: 'Pennsylvania',   avgRent1BR: 1200,  avgHomePrice: 260000,  propertyTaxRate: 0.0158, autoInsuranceMonthly: 145, gasPrice: 3.40 },
  RI: { name: 'Rhode Island',   avgRent1BR: 1550,  avgHomePrice: 440000,  propertyTaxRate: 0.0163, autoInsuranceMonthly: 130, gasPrice: 3.50 },
  SC: { name: 'South Carolina', avgRent1BR: 1100,  avgHomePrice: 290000,  propertyTaxRate: 0.0057, autoInsuranceMonthly: 148, gasPrice: 3.10 },
  SD: { name: 'South Dakota',   avgRent1BR: 900,   avgHomePrice: 290000,  propertyTaxRate: 0.0122, autoInsuranceMonthly: 120, gasPrice: 3.20 },
  TN: { name: 'Tennessee',      avgRent1BR: 1100,  avgHomePrice: 305000,  propertyTaxRate: 0.0071, autoInsuranceMonthly: 132, gasPrice: 3.00 },
  TX: { name: 'Texas',          avgRent1BR: 1400,  avgHomePrice: 335000,  propertyTaxRate: 0.0163, autoInsuranceMonthly: 178, gasPrice: 3.00 },
  UT: { name: 'Utah',           avgRent1BR: 1300,  avgHomePrice: 500000,  propertyTaxRate: 0.0058, autoInsuranceMonthly: 112, gasPrice: 3.50 },
  VT: { name: 'Vermont',        avgRent1BR: 1250,  avgHomePrice: 380000,  propertyTaxRate: 0.0190, autoInsuranceMonthly: 112, gasPrice: 3.50 },
  VA: { name: 'Virginia',       avgRent1BR: 1450,  avgHomePrice: 400000,  propertyTaxRate: 0.0087, autoInsuranceMonthly: 122, gasPrice: 3.30 },
  WA: { name: 'Washington',     avgRent1BR: 1700,  avgHomePrice: 580000,  propertyTaxRate: 0.0098, autoInsuranceMonthly: 148, gasPrice: 4.00 },
  WV: { name: 'West Virginia',  avgRent1BR: 750,   avgHomePrice: 160000,  propertyTaxRate: 0.0059, autoInsuranceMonthly: 132, gasPrice: 3.10 },
  WI: { name: 'Wisconsin',      avgRent1BR: 1050,  avgHomePrice: 275000,  propertyTaxRate: 0.0176, autoInsuranceMonthly: 115, gasPrice: 3.30 },
  WY: { name: 'Wyoming',        avgRent1BR: 900,   avgHomePrice: 340000,  propertyTaxRate: 0.0061, autoInsuranceMonthly: 118, gasPrice: 3.20 },
  DC: { name: 'Washington DC',  avgRent1BR: 2350,  avgHomePrice: 640000,  propertyTaxRate: 0.0056, autoInsuranceMonthly: 168, gasPrice: 3.50 },
};

export const STATE_LIST = Object.entries(STATE_DATA)
  .map(([code, data]) => ({ code, name: data.name }))
  .sort((a, b) => a.name.localeCompare(b.name));
