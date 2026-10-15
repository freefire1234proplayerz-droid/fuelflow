import type { Station, FuelTypeAvailability } from '../types/station';

const BASE_TIME = new Date().toISOString();

function createStation(
  id: string,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  fuels: FuelTypeAvailability[],
  rating: number,
  reviewCount: number,
  isOpen: boolean,
  distance?: number
): Station {
  return {
    id,
    name,
    address,
    latitude,
    longitude,
    fuelTypes: fuels,
    rating,
    reviewCount,
    isOpen,
    lastUpdated: BASE_TIME,
    distance,
  };
}

export const INDIAN_CURRENCY_CONFIG = {
  locale: 'en-IN',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export function formatCurrency(amount: number, config = INDIAN_CURRENCY_CONFIG): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(amount);
}

export function formatFuelPrice(price: number, fuelType: string): string {
  const formatted = formatCurrency(price);
  const unit = fuelType === 'cng' ? '₹/kg' : fuelType === 'ev_charging' ? '₹/kWh' : '₹/L';
  return `${formatted} ${unit}`;
}

export function formatFuelPriceShort(price: number, fuelType: string): string {
  const formatted = formatCurrency(price, { ...INDIAN_CURRENCY_CONFIG, minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const unit = fuelType === 'cng' ? '₹/kg' : fuelType === 'ev_charging' ? '₹/kWh' : '₹/L';
  return `${formatted} ${unit}`;
}

// Mumbai coordinates reference: 19.0760° N, 72.8777° E
const demoFuels = {
  petrol: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: 'petrol',
    available,
    price: price ?? 106.31,
    unit: '₹/L',
    lastReported: BASE_TIME,
  }),
  diesel: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: 'diesel',
    available,
    price: price ?? 94.27,
    unit: '₹/L',
    lastReported: BASE_TIME,
  }),
  cng: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: 'cng',
    available,
    price: price ?? 79.00,
    unit: '₹/kg',
    lastReported: BASE_TIME,
  }),
  ev_charging: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: 'ev_charging',
    available,
    price: price ?? 15.00,
    unit: '₹/kWh',
    lastReported: BASE_TIME,
  }),
};

export const DEMO_STATIONS: Station[] = [
  createStation(
    'mum-001',
    'HP Petrol Pump - Bandra West',
    'S.V. Road, Bandra West, Mumbai 400050',
    19.0544,
    72.8320,
    [
      demoFuels.petrol(true, 106.31),
      demoFuels.diesel(true, 94.27),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 15.00),
    ],
    4.3,
    234,
    true,
    1.2
  ),
  createStation(
    'mum-002',
    'BPCL - Andheri East',
    'Western Express Highway, Andheri East, Mumbai 400069',
    19.1136,
    72.8697,
    [
      demoFuels.petrol(true, 106.45),
      demoFuels.diesel(true, 94.40),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(false),
    ],
    4.1,
    189,
    true,
    2.8
  ),
  createStation(
    'mum-003',
    'Indian Oil - Dadar TT',
    'T.T. Circle, Dadar West, Mumbai 400028',
    19.0176,
    72.8478,
    [
      demoFuels.petrol(true, 106.20),
      demoFuels.diesel(true, 94.15),
      demoFuels.cng(false),
      demoFuels.ev_charging(true, 14.50),
    ],
    4.5,
    312,
    true,
    3.5
  ),
  createStation(
    'mum-004',
    'Shell - Lower Parel',
    'Senapati Bapat Marg, Lower Parel, Mumbai 400013',
    19.0012,
    72.8289,
    [
      demoFuels.petrol(true, 106.80),
      demoFuels.diesel(true, 94.75),
      demoFuels.cng(true, 79.50),
      demoFuels.ev_charging(true, 16.00),
    ],
    4.2,
    156,
    true,
    4.1
  ),
  createStation(
    'mum-005',
    'HP - Powai',
    'Hiranandani Gardens, Powai, Mumbai 400076',
    19.1197,
    72.9056,
    [
      demoFuels.petrol(true, 106.38),
      demoFuels.diesel(true, 94.33),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 15.50),
    ],
    4.4,
    267,
    true,
    5.2
  ),
  createStation(
    'mum-006',
    'BPCL - Goregaon East',
    'Aarey Road, Goregaon East, Mumbai 400065',
    19.1667,
    72.8521,
    [
      demoFuels.petrol(true, 106.25),
      demoFuels.diesel(true, 94.20),
      demoFuels.cng(false),
      demoFuels.ev_charging(false),
    ],
    3.9,
    98,
    false,
    6.8
  ),
  createStation(
    'mum-007',
    'Indian Oil - Chembur',
    'Sion-Trombay Road, Chembur, Mumbai 400071',
    19.0614,
    72.8945,
    [
      demoFuels.petrol(true, 106.15),
      demoFuels.diesel(true, 94.10),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 14.00),
    ],
    4.0,
    178,
    true,
    7.3
  ),
  createStation(
    'mum-008',
    'HP - Thane Ghodbunder',
    'Ghodbunder Road, Thane West, Thane 400607',
    19.2183,
    72.9781,
    [
      demoFuels.petrol(true, 106.30),
      demoFuels.diesel(true, 94.25),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 15.00),
    ],
    4.3,
    201,
    true,
    12.5
  ),
  createStation(
    'mum-009',
    'BPCL - Vashi Navi Mumbai',
    'Sector 17, Vashi, Navi Mumbai 400703',
    19.0760,
    72.9996,
    [
      demoFuels.petrol(true, 106.20),
      demoFuels.diesel(true, 94.15),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 15.00),
    ],
    4.2,
    145,
    true,
    15.2
  ),
  createStation(
    'mum-010',
    'Shell - Malad West',
    'S.V. Road, Malad West, Mumbai 400064',
    19.1884,
    72.8428,
    [
      demoFuels.petrol(true, 106.50),
      demoFuels.diesel(true, 94.50),
      demoFuels.cng(true, 79.00),
      demoFuels.ev_charging(true, 16.50),
    ],
    4.1,
    112,
    true,
    8.9
  ),
];

export const MUMBAI_CENTER = {
  latitude: 19.0760,
  longitude: 72.8777,
  name: 'Mumbai',
} as const;

export const FUEL_TYPE_LABELS: Record<string, string> = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  cng: 'CNG',
  ev_charging: 'EV Charging',
};

export const FUEL_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  petrol: { bg: 'bg-fuel-petrol-bg', text: 'text-fuel-petrol-text', border: 'border-fuel-petrol-border' },
  diesel: { bg: 'bg-fuel-diesel-bg', text: 'text-fuel-diesel-text', border: 'border-fuel-diesel-border' },
  cng: { bg: 'bg-fuel-cng-bg', text: 'text-fuel-cng-text', border: 'border-fuel-cng-border' },
  ev_charging: { bg: 'bg-fuel-ev-bg', text: 'text-fuel-ev-text', border: 'border-fuel-ev-border' },
};

export const FUEL_TYPE_ICONS: Record<string, React.ReactNode> = {
  petrol: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  diesel: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.424 15.424a2 2 0 00-1.022-.547l-2.342-.487a6 6 0 00-3.84.106l-2.146 2.147a4 4 0 01-5.656 0L9 14" />
    </svg>
  ),
  cng: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  ev_charging: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
};
