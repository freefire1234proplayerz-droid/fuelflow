import { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatFuelPrice } from '../../utils/demoData';
import { FUEL_TYPE_LABELS, FUEL_TYPE_ICONS, FUEL_TYPE_COLORS } from '../../utils/demoData';
import type { Station } from '../../types/station';

interface StationDetailSheetProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (station: Station) => void;
  className?: string;
}

export const StationDetailSheet = ({
  station,
  isOpen,
  onClose,
  onNavigate,
  className = '',
}: StationDetailSheetProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.focus();
    }
  }, [isOpen]);

  if (!station || !isOpen) return null;

  const availableFuels = station.fuelTypes.filter((f) => f.available);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="station-detail-title">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white dark:bg-surface-900
          rounded-t-3xl shadow-sheet
          transform transition-transform duration-300 ease-spring
          safe-area-inset-bottom
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          ${className}
        `}
        tabIndex={-1}
        role="document"
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-surface-300 dark:bg-surface-600" aria-hidden="true" />
        
        <div className="p-4 sm:p-6 pb-8">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h2 id="station-detail-title" className="text-heading-md font-bold text-surface-900 dark:text-surface-100 truncate">
                {station.name}
              </h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 truncate">
                {station.address}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors flex-shrink-0"
              aria-label="Close station details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant={station.isOpen ? 'success' : 'danger'} size="md">
              {station.isOpen ? 'Open Now' : 'Closed'}
            </Badge>
            {station.rating > 0 && (
              <span className="inline-flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800/50 px-3 py-1.5 rounded-xl">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{station.rating.toFixed(1)}</span>
                <span className="text-surface-400 dark:text-surface-500">({station.reviewCount} reviews)</span>
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Available Fuels</h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Available fuel types">
              {availableFuels.map((fuel) => (
                <span
                  key={fuel.type}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium
                    ${FUEL_TYPE_COLORS[fuel.type]?.bg} ${FUEL_TYPE_COLORS[fuel.type]?.text} ${FUEL_TYPE_COLORS[fuel.type]?.border}
                  `}
                >
                  {FUEL_TYPE_ICONS[fuel.type]}
                  <span className="font-medium">{FUEL_TYPE_LABELS[fuel.type]}</span>
                  {fuel.price !== undefined && (
                    <span className="font-semibold bg-white/50 dark:bg-surface-900/50 px-2.5 py-1 rounded-lg">
                      {formatFuelPrice(fuel.price, fuel.type)}
                    </span>
                  )}
                </span>
              ))}
              {availableFuels.length === 0 && (
                <span className="text-sm text-surface-500 dark:text-surface-400 italic">
                  No fuel types available
                </span>
              )}
            </div>
          </div>

          <div className="mb-6 pt-4 border-t border-surface-200 dark:border-surface-700">
            <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {station.distance !== undefined && (
                <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-medium">{station.distance.toFixed(1)} km away</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{station.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 col-span-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated {new Date(station.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {onNavigate && (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onNavigate(station)}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              iconPosition="left"
            >
              Navigate to {station.name}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};