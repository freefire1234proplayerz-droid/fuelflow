import { StationCard } from './StationCard';
import type { Station } from '../../types/station';

interface StationListProps {
  stations: Station[];
  onSelectStation?: (station: Station) => void;
  onNavigate?: (station: Station) => void;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  className?: string;
}

export const StationList = ({
  stations,
  onSelectStation,
  onNavigate,
  loading = false,
  error = null,
  emptyMessage = 'No stations found matching your criteria.',
  emptyAction,
  className = '',
}: StationListProps) => {
  if (loading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
        role="status"
        aria-label="Loading stations"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} role="listitem" className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5 animate-pulse">
            <div className="h-5 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mb-3" />
            <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-10 bg-surface-200 dark:bg-surface-700 rounded w-24" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 px-4 ${className}`} role="alert">
        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="mt-4 text-heading-sm font-medium text-surface-900 dark:text-surface-100">
          Failed to load stations
        </h3>
        <p className="mt-2 text-surface-500 dark:text-surface-400 max-w-md mx-auto">
          {error}
        </p>
        {emptyAction && (
          <div className="mt-6">{emptyAction}</div>
        )}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className={`text-center py-16 px-4 ${className}`} role="status">
        <svg className="mx-auto h-20 w-20 text-surface-300 dark:text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="mt-4 text-heading-sm font-medium text-surface-900 dark:text-surface-100">
          No stations found
        </h3>
        <p className="mt-2 text-surface-500 dark:text-surface-400 max-w-md mx-auto">
          {emptyMessage}
        </p>
        {emptyAction && (
          <div className="mt-6">{emptyAction}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      role="list"
      aria-label="Fuel stations"
    >
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onSelect={onSelectStation}
          onNavigate={onNavigate}
          variant="default"
        />
      ))}
    </div>
  );
};