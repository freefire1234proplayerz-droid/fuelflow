import React from "react";
import type { FuelTypeAvailability } from "../../types/station";

interface FuelTypeBadgeProps {
  fuel: FuelTypeAvailability;
  showPrice?: boolean;
}

const FUEL_TYPE_LABELS: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  ev_charging: "EV Charging",
};

const FUEL_TYPE_COLORS: Record<string, string> = {
  petrol: "bg-yellow-100 text-yellow-700 border-yellow-200",
  diesel: "bg-sky-100 text-sky-700 border-sky-200",
  cng: "bg-violet-100 text-violet-700 border-violet-200",
  ev_charging: "bg-green-100 text-green-700 border-green-200",
};

const FUEL_TYPE_ICONS: Record<string, React.ReactNode> = {
  petrol: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  diesel: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.424 15.424a2 2 0 00-1.022-.547l-2.342-.487a6 6 0 00-3.84.106l-2.146 2.147a4 4 0 01-5.656 0L9 14" />
    </svg>
  ),
  cng: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  ev_charging: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
};

export const FuelTypeBadge = ({ fuel, showPrice = true }: FuelTypeBadgeProps) => {
  const label = FUEL_TYPE_LABELS[fuel.type] || fuel.type;
  const colorClass = FUEL_TYPE_COLORS[fuel.type] || "bg-slate-100 text-slate-700";
  const icon = FUEL_TYPE_ICONS[fuel.type];

  if (!fuel.available) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${colorClass} opacity-50`}>
        {icon}
        <span className="font-medium">{label}</span>
        <span className="text-xs font-semibold">Unavailable</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${colorClass}`}>
      {icon}
      <span className="font-medium">{label}</span>
      {showPrice && fuel.price !== undefined && (
        <span className="text-xs font-semibold bg-white/50 px-2 py-0.5 rounded">
          {fuel.price.toFixed(3)} {fuel.unit}
        </span>
      )}
    </span>
  );
};

export const FuelTypeFilterChip = ({
  type,
  selected,
  onChange,
}: {
  type: FuelTypeAvailability["type"];
  selected: boolean;
  onChange: (selected: boolean) => void;
}) => {
  const label = FUEL_TYPE_LABELS[type] || type;
  const colorClass = FUEL_TYPE_COLORS[type] || "bg-slate-100 text-slate-700";
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
          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all
          ${selected
            ? `${colorClass} border-transparent shadow-md`
            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }
        `}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </span>
    </label>
  );
};