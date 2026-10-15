import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { SearchPanel } from './components/search/SearchPanel';
import { StationList } from './components/station/StationList';
import { MapComponent } from './components/map/MapComponent';
import { StationDetailSheet } from './components/station/StationDetailSheet';
import { LocationPermission } from './components/location/LocationPermission';
import { DEMO_STATIONS, MUMBAI_CENTER } from './utils/demoData';
import type { SearchFilters, Station } from './types/station';
import { DEFAULT_FILTERS } from './types/station';
import { Badge } from './components/ui/Badge';

const NAV_ITEMS = [
  { id: 'explore', label: 'Explore', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ), activeIcon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ) },
  { id: 'map', label: 'Map', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-5.447A1 1 0 013 12V8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-.293.707L9 20zm9-6a1 1 0 010-2 1 1 0 012 0v2a1 1 0 01-2 0V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-2z" />
    </svg>
  ), activeIcon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 20l-5.447-5.447A1 1 0 013 12V8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-.293.707L9 20zm9-6a1 1 0 010-2 1 1 0 012 0v2a1 1 0 01-2 0V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-2z" />
    </svg>
  ) },
  { id: 'saved', label: 'Saved', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ), activeIcon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ) },
  { id: 'profile', label: 'Profile', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h18a7 7 0 00-7-7z" />
    </svg>
  ), activeIcon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h18a7 7 0 00-7-7z" />
    </svg>
  ) },
];

function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'map' | 'saved' | 'profile'>('explore');
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<string>('distance');
  const [stations, setStations] = useState<Station[]>(DEMO_STATIONS);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [location, setLocation] = useState<string>('Mumbai, Maharashtra');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

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

  const sortedStations = useMemo(() => {
    const sorted = [...filteredStations];
    switch (sortBy) {
      case 'distance':
        return sorted.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
      case 'price_petrol':
        return sorted.sort((a, b) => {
          const aPrice = a.fuelTypes.find((f) => f.type === 'petrol')?.price ?? Infinity;
          const bPrice = b.fuelTypes.find((f) => f.type === 'petrol')?.price ?? Infinity;
          return aPrice - bPrice;
        });
      case 'price_diesel':
        return sorted.sort((a, b) => {
          const aPrice = a.fuelTypes.find((f) => f.type === 'diesel')?.price ?? Infinity;
          const bPrice = b.fuelTypes.find((f) => f.type === 'diesel')?.price ?? Infinity;
          return aPrice - bPrice;
        });
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredStations, sortBy]);

  // Calculate distances from user location if available
  useEffect(() => {
    if (userLocation) {
      const updatedStations = stations.map((station) => {
        if (station.latitude && station.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            station.latitude,
            station.longitude
          );
          return { ...station, distance };
        }
        return station;
      });
      setStations(updatedStations);
    }
  }, [userLocation, stations]);

  const activeFiltersCount =
    filters.fuelTypes.length !== 4 ||
    filters.maxDistance !== 10 ||
    filters.openOnly ||
    filters.minRating > 0;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Header
        title="FuelFlow"
        subtitle="Find fuel. Skip the queue."
        showHealth={true}
        showLocation={true}
        location={location}
        onLocationClick={() => navigator.geolocation?.getCurrentPosition(
          (pos) => {
            setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
          },
          () => {},
          { enableHighAccuracy: true, timeout: 10000 }
        )}
      />

      <main className="pb-24 pt-4" role="main">
        <div className="max-w-screen-xl mx-auto px-4 space-y-4">
          {activeTab === 'explore' && (
            <>
              <SearchPanel
                filters={filters}
                sortBy={sortBy}
                onFiltersChange={setFilters}
                onSortChange={setSortBy}
                onSearch={() => {}}
                onLocationClick={() => navigator.geolocation?.getCurrentPosition(
                  (pos) => {
                    setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
                    setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
                  },
                  () => {},
                  { enableHighAccuracy: true, timeout: 10000 }
                )}
                loading={false}
                demoMode={true}
                location={location}
              />

              <div className="flex items-center justify-between mb-4">
                <h2 id="stations-title" className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100">
                  Nearby Stations ({sortedStations.length})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-surface-500 dark:text-surface-400">
                    {activeFiltersCount && <Badge variant="brand" size="sm">Filters</Badge>}
                  </span>
                </div>
              </div>

              <StationList
                stations={sortedStations}
                onSelectStation={setSelectedStation}
                onNavigate={(station) => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${station.latitude},${station.longitude}&travelmode=driving`;
                        window.open(url, '_blank');
                      },
                      () => {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}&travelmode=driving`;
                        window.open(url, '_blank');
                      },
                      { enableHighAccuracy: true, timeout: 10000 }
                    );
                  }
                  setSelectedStation(null);
                }}
                loading={false}
                emptyMessage={
                  filters.fuelTypes.length === 0
                    ? 'Select at least one fuel type to see stations.'
                    : 'No stations match your current filters. Try adjusting your search criteria.'
                }
              />
            </>
          )}

          {activeTab === 'map' && (
            <div className="h-[calc(100vh-200px)] min-h-[400px]">
              <MapComponent
                stations={sortedStations}
                selectedStation={selectedStation}
                onStationClick={setSelectedStation}
                center={MUMBAI_CENTER}
                zoom={12}
                className="w-full h-full"
              />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-16 px-4">
              <svg className="mx-auto h-20 w-20 text-surface-300 dark:text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="mt-4 text-heading-sm font-medium text-surface-900 dark:text-surface-100">
                No saved stations yet
              </h3>
              <p className="mt-2 text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                Tap the bookmark icon on any station to save it for quick access.
              </p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h18a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-bold text-surface-900 dark:text-surface-100">
                      Welcome to FuelFlow
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      Your personal fuel companion
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
                <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Dark Mode
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-brand-600 border-surface-300 rounded focus:ring-brand-500"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Show EV Charging Stations
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-brand-600 border-surface-300 rounded focus:ring-brand-500"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Price Alerts
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-brand-600 border-surface-300 rounded focus:ring-brand-500"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
                <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  About
                </h3>
                <div className="space-y-2 text-sm text-surface-500 dark:text-surface-400">
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="font-mono text-surface-700 dark:text-surface-300">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Demo Mode</span>
                    <span className="font-mono text-surface-700 dark:text-surface-300">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Source</span>
                    <span className="font-mono text-surface-700 dark:text-surface-300">Simulated</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation
        items={NAV_ITEMS}
        activeItem={activeTab}
        onItemClick={(id) => setActiveTab(id as typeof activeTab)}
      />

      <LocationPermission
        onGranted={(position) => {
          const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
          setUserLocation(coords);
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        }}
        onDenied={() => {}}
      />

      <StationDetailSheet
        station={selectedStation}
        isOpen={selectedStation !== null}
        onClose={() => setSelectedStation(null)}
        onNavigate={(station) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${station.latitude},${station.longitude}&travelmode=driving`;
                window.open(url, '_blank');
              },
              () => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}&travelmode=driving`;
                window.open(url, '_blank');
              },
              { enableHighAccuracy: true, timeout: 10000 }
            );
          }
          setSelectedStation(null);
        }}
      />
    </div>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default App;