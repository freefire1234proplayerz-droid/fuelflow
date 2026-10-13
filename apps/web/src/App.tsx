import { useState, useCallback, useMemo } from "react";
import { SearchPanel } from "./components/search/SearchPanel";
import { StationList } from "./components/station/StationList";
import { MapPlaceholder } from "./components/map/MapPlaceholder";
import { HealthIndicator } from "./components/health/HealthIndicator";
import { useHealth } from "./hooks/useHealth";
import { DEMO_STATIONS } from "./utils/demoData";
import type { SearchFilters, Station } from "./types/station";
import { DEFAULT_FILTERS } from "./types/station";

const APP_NAME = "FuelFlow";
const APP_TAGLINE = "Find fuel. Skip the queue.";

function App() {
  const { health, loading: healthLoading, error: healthError, refetch: refetchHealth } = useHealth();
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [stations, setStations] = useState<Station[]>(DEMO_STATIONS);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    setSearchLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStations(DEMO_STATIONS);
    setSearchLoading(false);
  }, []);

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handleStationSelect = useCallback((station: Station) => {
    setSelectedStation(station);
  }, []);

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      if (filters.openOnly && !station.isOpen) return false;
      if (station.rating < filters.minRating) return false;
      const hasMatchingFuel = station.fuelTypes.some(
        (f) => f.available && filters.fuelTypes.includes(f.type)
      );
      if (!hasMatchingFuel) return false;
      return true;
    });
  }, [stations, filters]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="#22c55e" />
                <path d="M50 20 L50 50 L30 30 M50 50 L70 30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="50" cy="75" r="8" fill="white" opacity="0.9" />
                <circle cx="50" cy="75" r="4" fill="#22c55e" />
              </svg>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{APP_NAME}</h1>
                <p className="text-xs text-slate-500">{APP_TAGLINE}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <HealthIndicator
                health={health}
                loading={healthLoading}
                error={healthError}
                onRetry={refetchHealth}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <SearchPanel
              filters={filters}
              onFiltersChange={handleFilterChange}
              onSearch={handleSearch}
              loading={searchLoading}
              demoMode={true}
            />
          </aside>

          <div className="lg:col-span-2 space-y-6">
            <MapPlaceholder
              stations={filteredStations}
              selectedStation={selectedStation}
              onStationClick={handleStationSelect}
            />

            <section aria-labelledby="stations-title">
              <div className="flex items-center justify-between mb-4">
                <h2 id="stations-title" className="text-lg font-semibold text-slate-900">
                  Nearby Stations ({filteredStations.length})
                </h2>
                <span className="text-sm text-slate-500">
                  Showing {filteredStations.length} of {stations.length} stations
                </span>
              </div>
              <StationList
                stations={filteredStations}
                onSelectStation={handleStationSelect}
                loading={searchLoading}
                emptyMessage={
                  filters.fuelTypes.length === 0
                    ? "Select at least one fuel type to see stations."
                    : "No stations match your current filters. Try adjusting your search criteria."
                }
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Demo Data Notice</h3>
              <p className="text-sm text-slate-600">
                All station data, prices, availability, and ratings shown are simulated for demonstration purposes only.
                No real fuel stations, live prices, or location services are integrated.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Fuel Types</h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["petrol", "diesel", "cng", "ev_charging"].map((type) => (
                  <span key={type} className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                    {type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Status</h3>
              <p className="text-sm text-slate-600">
                Phase 2: Frontend Foundation Complete
                <br />
                Backend API: <span className="font-mono text-primary-600">Running on port 3000</span>
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>FuelFlow &copy; 2024 &mdash; Built with React, TypeScript, Vite, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;