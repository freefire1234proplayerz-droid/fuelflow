import { StationCard } from "./StationCard";
import type { Station } from "../../types/station";

interface StationListProps {
  stations: Station[];
  onSelectStation?: (station: Station) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export const StationList = ({
  stations,
  onSelectStation,
  loading = false,
  emptyMessage = "No stations found matching your criteria.",
}: StationListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="status" aria-label="Loading stations">
        {[...Array(6)].map((_, i) => (
          <div key={i} role="listitem" className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-10 bg-slate-200 rounded w-24" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="text-center py-12 px-4" role="status">
        <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-slate-900">No stations found</h3>
        <p className="mt-2 text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Fuel stations">
      {stations.map((station) => (
        <StationCard key={station.id} station={station} onSelect={onSelectStation} />
      ))}
    </div>
  );
};