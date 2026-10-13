import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { FuelTypeFilterChip } from "../station/FuelTypeBadge";
import type { SearchFilters } from "../../types/station";

interface SearchPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  loading?: boolean;
  demoMode?: boolean;
}

const DISTANCE_OPTIONS = [
  { value: "2", label: "2 km" },
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
  { value: "25", label: "25 km" },
  { value: "50", label: "50 km" },
];

export const SearchPanel = ({ filters, onFiltersChange, onSearch, loading = false, demoMode = true }: SearchPanelProps) => {
  const handleFuelTypeChange = (type: SearchFilters["fuelTypes"][number]) => (selected: boolean) => {
    const newFuelTypes = selected
      ? [...filters.fuelTypes, type]
      : filters.fuelTypes.filter((t) => t !== type);
    onFiltersChange({ ...filters, fuelTypes: newFuelTypes });
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5" aria-labelledby="search-panel-title">
      <h2 id="search-panel-title" className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Find Fuel Stations
      </h2>

      {demoMode && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> All station data shown below is simulated for demonstration purposes.
              No real location services or live fuel data are being used.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Location"
          placeholder="Enter address, city, or postal code"
          value=""
          onChange={() => {}}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          disabled={demoMode}
          helperText={demoMode ? "Location search is disabled in demo mode" : undefined}
        />

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-700">Fuel Types</legend>
          <div className="flex flex-wrap gap-2">
            {(["petrol", "diesel", "cng", "ev_charging"] as const).map((type) => (
              <FuelTypeFilterChip
                key={type}
                type={type}
                selected={filters.fuelTypes.includes(type)}
                onChange={handleFuelTypeChange(type)}
              />
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="max-distance" className="block text-sm font-medium text-slate-700 mb-1.5">
              Maximum Distance
            </label>
            <select
              id="max-distance"
              value={filters.maxDistance.toString()}
              onChange={(e) => onFiltersChange({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              {DISTANCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="min-rating" className="block text-sm font-medium text-slate-700 mb-1.5">
              Minimum Rating
            </label>
            <select
              id="min-rating"
              value={filters.minRating.toString()}
              onChange={(e) => onFiltersChange({ ...filters, minRating: Number(e.target.value) })}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="0">Any rating</option>
              <option value="3.5">3.5+ stars</option>
              <option value="4.0">4.0+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.openOnly}
            onChange={(e) => onFiltersChange({ ...filters, openOnly: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-slate-700">Open now only</span>
        </label>

        <div className="flex gap-3 pt-2">
          <Button type="button" onClick={onSearch} disabled={loading} className="flex-1" size="lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? "Searching..." : "Search Stations"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onFiltersChange({ ...filters, fuelTypes: ["petrol", "diesel", "cng", "ev_charging"], maxDistance: 10, openOnly: false, minRating: 0 })}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};