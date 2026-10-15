import { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { FuelTypeFilterChip } from './FuelTypeBadge';
import type { SearchFilters, SortOption } from '../../types/station';

const DISTANCE_OPTIONS = [
  { value: '2', label: '2 km' },
  { value: '5', label: '5 km' },
  { value: '10', label: '10 km' },
  { value: '25', label: '25 km' },
  { value: '50', label: '50 km' },
];

const SORT_OPTIONS: SortOption[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'price_petrol', label: 'Petrol Price' },
  { value: 'price_diesel', label: 'Diesel Price' },
  { value: 'rating', label: 'Rating' },
];

interface SearchPanelProps {
  filters: SearchFilters;
  sortBy: string;
  onFiltersChange: (filters: SearchFilters) => void;
  onSortChange: (sortBy: string) => void;
  onSearch: () => void;
  onLocationClick?: () => void;
  loading?: boolean;
  demoMode?: boolean;
  location?: string;
}

export const SearchPanel = ({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onSearch,
  onLocationClick,
  loading = false,
  demoMode = true,
}: SearchPanelProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFuelTypeChange = (type: SearchFilters['fuelTypes'][number]) => (selected: boolean) => {
    const newFuelTypes = selected
      ? [...filters.fuelTypes, type]
      : filters.fuelTypes.filter((t) => t !== type);
    onFiltersChange({ ...filters, fuelTypes: newFuelTypes });
  };

  const handleDistanceChange = (distance: string) => {
    onFiltersChange({ ...filters, maxDistance: Number(distance) });
  };

  const handleRatingChange = (rating: string) => {
    onFiltersChange({ ...filters, minRating: Number(rating) });
  };

  const handleOpenOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, openOnly: checked });
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  const handleSearch = () => {
    onSearch();
  };

  const handleReset = () => {
    onFiltersChange({
      fuelTypes: ['petrol', 'diesel', 'cng', 'ev_charging'],
      maxDistance: 10,
      openOnly: false,
      minRating: 0,
    });
    onSortChange('distance');
  };

  const activeFiltersCount =
    filters.fuelTypes.length !== 4 ||
    filters.maxDistance !== 10 ||
    filters.openOnly ||
    filters.minRating > 0;

  return (
    <section
      className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm p-4 sm:p-5"
      aria-labelledby="search-panel-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="search-panel-title" className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Fuel Stations
        </h2>
        {activeFiltersCount && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={loading}
            className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100"
          >
            Reset
          </Button>
        )}
      </div>

      {demoMode && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Demo Mode:</strong> All station data shown below is simulated for demonstration purposes.
              No real location services or live fuel data are being used.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Location"
          placeholder="Enter address, city, or PIN code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          disabled={demoMode}
          helperText={demoMode ? 'Location search is disabled in demo mode. Tap to use current location.' : undefined}
          onClick={onLocationClick}
        />

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-surface-700 dark:text-surface-300">Fuel Types</legend>
          <div className="flex flex-wrap gap-2">
            {(['petrol', 'diesel', 'cng', 'ev_charging'] as const).map((type) => (
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
            <label htmlFor="max-distance" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Maximum Distance
            </label>
            <Select
              id="max-distance"
              value={filters.maxDistance.toString()}
              onChange={(e) => handleDistanceChange(e.target.value)}
              options={DISTANCE_OPTIONS}
              placeholder="Select distance"
            />
          </div>

          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Sort By
            </label>
            <Select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              options={SORT_OPTIONS}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-rating" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
              Minimum Rating
            </label>
            <Select
              id="min-rating"
              value={filters.minRating.toString()}
              onChange={(e) => handleRatingChange(e.target.value)}
              options={[
                { value: '0', label: 'Any rating' },
                { value: '3.5', label: '3.5+ stars' },
                { value: '4.0', label: '4.0+ stars' },
                { value: '4.5', label: '4.5+ stars' },
              ]}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.openOnly}
                onChange={(e) => handleOpenOnlyChange(e.target.checked)}
                className="w-4 h-4 text-brand-600 dark:text-brand-400 border-surface-300 dark:border-surface-600 rounded focus:ring-brand-500"
              />
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Open now only</span>
            </label>
          </div>
        </div>

        {showAdvanced && (
          <div className="pt-2 border-t border-surface-200 dark:border-surface-700">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Advanced filters coming soon: brand preference, amenities, payment methods.
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="flex-1"
            size="lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? 'Searching...' : 'Search Stations'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            disabled={loading}
            size="lg"
          >
            {showAdvanced ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
    </section>
  );
};