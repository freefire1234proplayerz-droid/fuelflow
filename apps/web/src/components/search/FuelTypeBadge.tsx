import type { FuelTypeAvailability } from '../../types/station';
import { FUEL_TYPE_LABELS, FUEL_TYPE_COLORS, FUEL_TYPE_ICONS } from '../../utils/demoData';

interface FuelTypeBadgeProps {
  fuel: FuelTypeAvailability;
  showPrice?: boolean;
  className?: string;
}

export const FuelTypeBadge = ({
  fuel,
  showPrice = true,
  className = '',
}: FuelTypeBadgeProps) => {
  const label = FUEL_TYPE_LABELS[fuel.type] || fuel.type;
  const colorConfig = FUEL_TYPE_COLORS[fuel.type];
  const icon = FUEL_TYPE_ICONS[fuel.type];

  if (!fuel.available) {
    return (
      <span
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border
          ${colorConfig?.bg} ${colorConfig?.text} ${colorConfig?.border} opacity-50
          ${className}
        `}
      >
        {icon}
        <span className="font-medium">{label}</span>
        <span className="text-xs font-semibold">Unavailable</span>
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border
        ${colorConfig?.bg} ${colorConfig?.text} ${colorConfig?.border}
        ${className}
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {showPrice && fuel.price !== undefined && (
        <span className="text-xs font-semibold bg-white/50 dark:bg-surface-900/50 px-2 py-0.5 rounded-lg">
          ₹{fuel.price.toFixed(2)} {fuel.unit}
        </span>
      )}
    </span>
  );
};

interface FuelTypeFilterChipProps {
  type: FuelTypeAvailability['type'];
  selected: boolean;
  onChange: (selected: boolean) => void;
  className?: string;
}

export const FuelTypeFilterChip = ({
  type,
  selected,
  onChange,
  className = '',
}: FuelTypeFilterChipProps) => {
  const colorConfig = FUEL_TYPE_COLORS[type];
  const icon = FUEL_TYPE_ICONS[type];

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <span
        className={`
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all duration-200
          ${selected
            ? `${colorConfig?.bg} ${colorConfig?.text} ${colorConfig?.border} border-transparent shadow-md`
            : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 hover:bg-surface-50 dark:hover:bg-surface-700/50'
          }
          ${className}
        `}
      >
        {icon}
        <span className="font-medium">{FUEL_TYPE_LABELS[type] || type}</span>
      </span>
    </label>
  );
};