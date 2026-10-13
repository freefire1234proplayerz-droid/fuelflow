import type { Station } from "../../types/station";

interface MapPlaceholderProps {
  stations: Station[];
  selectedStation?: Station | null;
  onStationClick?: (station: Station) => void;
}

export const MapPlaceholder = ({ stations, selectedStation, onStationClick }: MapPlaceholderProps) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" aria-labelledby="map-title">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h2 id="map-title" className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-5.447A1 1 0 013 12V8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-.293.707L9 20zm9-6a1 1 0 010-2 1 1 0 012 0v2a1 1 0 01-2 0V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-2z" />
          </svg>
          Map View
        </h2>
      </div>
      <div className="aspect-video relative min-h-[400px]">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center px-6">
            <svg className="mx-auto h-20 w-20 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-slate-900">Interactive Map</h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">
              Map integration coming soon. Station markers will show real-time fuel availability, prices, and wait times.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {stations.slice(0, 3).map((station) => (
                <button
                  key={station.id}
                  onClick={() => onStationClick?.(station)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  {station.name}
                </button>
              ))}
              {stations.length > 3 && (
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  +{stations.length - 3} more stations
                </button>
              )}
            </div>
          </div>
        </div>

        {selectedStation && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 md:bottom-4 md:top-auto">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 animate-slide-up">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedStation.name}</h3>
                  <p className="text-sm text-slate-500">{selectedStation.address}</p>
                </div>
                <button
                  onClick={() => onStationClick?.(selectedStation)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Close station info"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedStation.fuelTypes.filter((f) => f.available).map((fuel) => (
                  <span key={fuel.type} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                    {fuel.type.replace("_", " ").toUpperCase()}: {fuel.price?.toFixed(3)} {fuel.unit}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {selectedStation.distance?.toFixed(1)} km
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {selectedStation.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.2s ease-out;
          }
        `}</style>
      </div>
    </section>
  );
};