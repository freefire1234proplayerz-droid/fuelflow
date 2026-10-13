import type { Station, FuelTypeAvailability } from "../types/station";

const BASE_TIME = new Date().toISOString();

function createStation(
  id: string,
  name: string,
  address: string,
  lat: number,
  lng: number,
  fuels: FuelTypeAvailability[],
  rating: number,
  reviewCount: number,
  isOpen: boolean
): Station {
  return {
    id,
    name,
    address,
    latitude: lat,
    longitude: lng,
    fuelTypes: fuels,
    rating,
    reviewCount,
    isOpen,
    lastUpdated: BASE_TIME,
  };
}

const demoFuels = {
  petrol: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: "petrol",
    available,
    price: price ?? 1.899,
    unit: "€/L",
    lastReported: BASE_TIME,
  }),
  diesel: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: "diesel",
    available,
    price: price ?? 1.759,
    unit: "€/L",
    lastReported: BASE_TIME,
  }),
  cng: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: "cng",
    available,
    price: price ?? 1.299,
    unit: "€/kg",
    lastReported: BASE_TIME,
  }),
  ev_charging: (available: boolean, price?: number): FuelTypeAvailability => ({
    type: "ev_charging",
    available,
    price: price ?? 0.45,
    unit: "€/kWh",
    lastReported: BASE_TIME,
  }),
};

export const DEMO_STATIONS: Station[] = [
  createStation(
    "1",
    "Shell City Center",
    "123 Main Street, Downtown",
    40.7128,
    -74.006,
    [
      demoFuels.petrol(true, 1.899),
      demoFuels.diesel(true, 1.759),
      demoFuels.cng(false),
      demoFuels.ev_charging(true, 0.42),
    ],
    4.2,
    156,
    true
  ),
  createStation(
    "2",
    "BP Highway Station",
    "456 Highway Ave, Exit 12",
    40.7282,
    -74.0776,
    [
      demoFuels.petrol(true, 1.929),
      demoFuels.diesel(true, 1.789),
      demoFuels.cng(true, 1.349),
      demoFuels.ev_charging(false),
    ],
    4.0,
    89,
    true
  ),
  createStation(
    "3",
    "TotalEnergies Green Hub",
    "789 Eco Boulevard, Green District",
    40.7505,
    -73.9934,
    [
      demoFuels.petrol(true, 1.879),
      demoFuels.diesel(true, 1.739),
      demoFuels.cng(true, 1.259),
      demoFuels.ev_charging(true, 0.38),
    ],
    4.5,
    234,
    true
  ),
  createStation(
    "4",
    "Esso Neighborhood",
    "321 Oak Lane, Residential Area",
    40.7589,
    -73.9851,
    [
      demoFuels.petrol(true, 1.949),
      demoFuels.diesel(true, 1.809),
      demoFuels.cng(false),
      demoFuels.ev_charging(false),
    ],
    3.8,
    67,
    false
  ),
  createStation(
    "5",
    "Circle K Express",
    "555 Express Way, Commercial Zone",
    40.7484,
    -73.9857,
    [
      demoFuels.petrol(true, 1.919),
      demoFuels.diesel(true, 1.779),
      demoFuels.cng(true, 1.329),
      demoFuels.ev_charging(true, 0.48),
    ],
    4.1,
    112,
    true
  ),
];

export const FUEL_TYPE_LABELS: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  ev_charging: "EV Charging",
};

export const FUEL_TYPE_COLORS: Record<string, string> = {
  petrol: "bg-yellow-500",
  diesel: "bg-sky-500",
  cng: "bg-violet-500",
  ev_charging: "bg-green-500",
};

export const FUEL_TYPE_ICONS: Record<string, React.ReactNode> = {
  petrol: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  diesel: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.424 15.424a2 2 0 00-1.022-.547l-2.342-.487a6 6 0 00-3.84.106l-2.146 2.147a4 4 0 01-5.656 0L9 14" />
    </svg>
  ),
  cng: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  ev_charging: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
};