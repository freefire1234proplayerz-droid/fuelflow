import { Card, CardBody, Badge } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatFuelPrice } from '../../utils/demoData';
import { FUEL_TYPE_LABELS, FUEL_TYPE_ICONS, FUEL_TYPE_COLORS } from '../../utils/demoData';
import type { Station } from '../../types/station';

interface StationCardProps {
  station: Station;
  onSelect?: (station: Station) => void;
  onNavigate?: (station: Station) => void;
  variant?: 'default' | 'compact' | 'detailed';
  showDistance?: boolean;
  className?: string;
}

export const StationCard = ({
  station,
  onSelect,
  onNavigate,
  variant = 'default',
  showDistance = true,
  className = '',
}: StationCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(station);
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(station);
    }
  };

  const availableFuels = station.fuelTypes.filter((f) => f.available);

  if (variant === 'compact') {
    return (
      <Card
        hover
        onClick={handleClick}
        className={`h-full ${className}`}
        role="article"
        aria-labelledby={`station-${station.id}-name`}
        padded={false}
      >
        <CardBody className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3
                id={`station-${station.id}-name`}
                className="text-base font-semibold text-surface-900 dark:text-surface-100 truncate"
              >
                {station.name}
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5 truncate">
                {station.address}
              </p>
            </div>
            <Badge variant={station.isOpen ? 'success' : 'danger'} size="sm">
              {station.isOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3" role="group" aria-label="Available fuel types">
            {availableFuels.map((fuel) => (
              <span
                key={fuel.type}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium
                  ${FUEL_TYPE_COLORS[fuel.type]?.bg} ${FUEL_TYPE_COLORS[fuel.type]?.text} ${FUEL_TYPE_COLORS[fuel.type]?.border}
                `}
              >
                {FUEL_TYPE_ICONS[fuel.type]}
                <span className="font-medium">{FUEL_TYPE_LABELS[fuel.type]}</span>
                {fuel.price !== undefined && (
                  <span className="font-semibold bg-white/50 dark:bg-surface-900/50 px-1.5 py-0.5 rounded">
                    {formatFuelPriceShort(fuel.price, fuel.type)}
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

          <div className="pt-2 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between text-xs text-surface-500 dark:text-surface-400">
            {showDistance && station.distance !== undefined && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {station.distance.toFixed(1)} km
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {station.rating.toFixed(1)}
            </span>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      hover
      onClick={handleClick}
      className={`h-full ${className}`}
      role="article"
      aria-labelledby={`station-${station.id}-name`}
    >
      <CardBody className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3
              id={`station-${station.id}-name`}
              className="text-heading-sm font-bold text-surface-900 dark:text-surface-100 truncate"
            >
              {station.name}
            </h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 truncate">
              {station.address}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant={station.isOpen ? 'success' : 'danger'} size="sm">
              {station.isOpen ? 'Open' : 'Closed'}
            </Badge>
            {station.rating > 0 && (
              <span className="inline-flex items-center gap-1 text-sm text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-800/50 px-2.5 py-1.5 rounded-xl">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{station.rating.toFixed(1)}</span>
                <span className="text-surface-400 dark:text-surface-500">({station.reviewCount})</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Available fuel types">
          {availableFuels.map((fuel) => (
            <span
              key={fuel.type}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium
                ${FUEL_TYPE_COLORS[fuel.type]?.bg} ${FUEL_TYPE_COLORS[fuel.type]?.text} ${FUEL_TYPE_COLORS[fuel.type]?.border}
              `}
            >
              {FUEL_TYPE_ICONS[fuel.type]}
              <span className="font-medium">{FUEL_TYPE_LABELS[fuel.type]}</span>
              {fuel.price !== undefined && (
                <span className="font-semibold bg-white/50 dark:bg-surface-900/50 px-2 py-0.5 rounded-lg">
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

        <div className="pt-3 border-t border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400">
            {showDistance && station.distance !== undefined && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{station.distance.toFixed(1)} km away</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated {new Date(station.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {onNavigate && (
            <Button
              variant="primary"
              size="sm"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              iconPosition="left"
              onClick={handleNavigate}
              aria-label={`Navigate to ${station.name}`}
            >
              Navigate
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

function formatFuelPriceShort(price: number, fuelType: string): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('₹', '₹') + ' ' + (fuelType === 'cng' ? '₹/kg' : fuelType === 'ev_charging' ? '₹/kWh' : '₹/L');
}