export interface Station {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  fuelTypes: FuelTypeAvailability[];
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  lastUpdated: string;
  distance?: number;
}

export interface FuelTypeAvailability {
  type: "petrol" | "diesel" | "cng" | "ev_charging";
  available: boolean;
  price?: number;
  unit: string;
  lastReported: string;
}

export interface SearchFilters {
  fuelTypes: ("petrol" | "diesel" | "cng" | "ev_charging")[];
  maxDistance: number;
  openOnly: boolean;
  minRating: number;
}

export const DEFAULT_FILTERS: SearchFilters = {
  fuelTypes: ["petrol", "diesel", "cng", "ev_charging"],
  maxDistance: 10,
  openOnly: false,
  minRating: 0,
};

export type SortOption = { value: string; label: string };