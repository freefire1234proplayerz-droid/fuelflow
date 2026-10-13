import { Card, CardBody, Badge } from "../ui/Card";
import { FuelTypeBadge } from "./FuelTypeBadge";
import type { Station } from "../../types/station";

interface StationCardProps {
  station: Station;
  onSelect?: (station: Station) => void;
}

export const StationCard = ({ station, onSelect }: StationCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(station);
    }
  };

  const availableFuels = station.fuelTypes.filter((f) => f.available);

  return (
    <Card hover onClick={handleClick} className="h-full" role="article" aria-labelledby={`station-${station.id}-name`}>
      <CardBody className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 id={`station-${station.id}-name`} className="text-lg font-semibold text-slate-900 truncate">
              {station.name}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5 truncate">{station.address}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant={station.isOpen ? "success" : "danger"} className="text-xs">
              {station.isOpen ? "Open" : "Closed"}
            </Badge>
            {station.rating > 0 && (
              <span className="inline-flex items-center gap-1 text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{station.rating.toFixed(1)}</span>
                <span className="text-slate-400">({station.reviewCount})</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Available fuel types">
          {availableFuels.map((fuel) => (
            <FuelTypeBadge key={fuel.type} fuel={fuel} showPrice />
          ))}
          {availableFuels.length === 0 && (
            <span className="text-sm text-slate-500 italic">No fuel types available</span>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {station.distance !== undefined ? `${station.distance.toFixed(1)} km away` : "Distance unknown"}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Updated {new Date(station.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};