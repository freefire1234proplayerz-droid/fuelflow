import { useEffect, useRef, useState } from 'react';
import type { Station } from '../../types/station';

interface MapComponentProps {
  stations: Station[];
  selectedStation?: Station | null;
  onStationClick?: (station: Station) => void;
  center?: { latitude: number; longitude: number };
  zoom?: number;
  className?: string;
}

export const MapComponent = ({
  stations,
  selectedStation,
  onStationClick,
  center = { latitude: 19.0760, longitude: 72.8777 },
  zoom = 12,
  className = '',
}: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapLoaded) return;

    const initMap = async () => {
      try {
        const L = await import('leaflet');
        
        // Fix default marker icon
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const map = L.map(mapRef.current!, {
          center: [center.latitude, center.longitude],
          zoom,
          zoomControl: false,
          attributionControl: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        mapInstanceRef.current = map;
        setMapLoaded(true);

        // Add station markers
        stations.forEach((station) => {
          if (station.latitude && station.longitude) {
            const availableFuels = station.fuelTypes.filter((f) => f.available);
            const primaryFuel = availableFuels[0]?.type || 'petrol';
            
            const fuelColors: Record<string, string> = {
              petrol: '#f59e0b',
              diesel: '#3b82f6',
              cng: '#a855f7',
              ev_charging: '#22c55e',
            };

            const markerColor = fuelColors[primaryFuel] || '#22c55e';
            
            const markerIcon = L.divIcon({
              className: 'custom-station-marker',
              html: `
                <div style="
                  width: 36px;
                  height: 36px;
                  border-radius: 50%;
                  background: ${markerColor};
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: 14px;
                ">
                  ⛽
                </div>
              `,
              iconSize: [36, 36],
              iconAnchor: [18, 18],
            });

            const marker = L.marker([station.latitude, station.longitude], { icon: markerIcon })
              .addTo(map)
              .on('click', () => {
                onStationClick?.(station);
              });

            markersRef.current.set(station.id, marker);
          }
        });

        // Fit bounds to show all stations
        if (stations.length > 0) {
          const bounds = L.latLngBounds(
            stations.map((s) => [s.latitude, s.longitude]).filter((c): c is [number, number] => c !== null)
          );
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
      } catch (err) {
        console.error('Failed to initialize map:', err);
        setMapError('Failed to load map');
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current.clear();
      setMapLoaded(false);
    };
  }, [center, zoom]);

  // Update selected station marker
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    markersRef.current.forEach((marker, stationId) => {
      const isSelected = selectedStation?.id === stationId;
      const element = marker.getElement();
      if (element) {
        element.style.zIndex = isSelected ? '1000' : 'auto';
        element.style.transform = isSelected ? 'scale(1.2)' : 'scale(1)';
        element.style.transition = 'transform 0.2s ease, z-index 0.2s ease';
      }
    });

    // Pan to selected station
    if (selectedStation && selectedStation.latitude && selectedStation.longitude) {
      mapInstanceRef.current.panTo([selectedStation.latitude, selectedStation.longitude], {
        animate: true,
        duration: 1,
      });
    }
  }, [selectedStation, mapLoaded]);

  if (mapError) {
    return (
      <div
        className={`
          aspect-video relative min-h-[400px] rounded-2xl
          bg-surface-100 dark:bg-surface-800
          border border-surface-200 dark:border-surface-700
          flex items-center justify-center
          ${className}
        `}
        role="region"
        aria-label="Map unavailable"
      >
        <div className="text-center px-6">
          <svg className="mx-auto h-20 w-20 text-surface-300 dark:text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="mt-4 text-heading-sm font-medium text-surface-900 dark:text-surface-100">
            Map Unavailable
          </h3>
          <p className="mt-2 text-surface-500 dark:text-surface-400 max-w-md mx-auto">
            {mapError}. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div
        className={`
          aspect-video relative min-h-[400px] rounded-2xl
          bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-800 dark:to-surface-900
          border border-surface-200 dark:border-surface-700
          flex items-center justify-center
          ${className}
        `}
        role="region"
        aria-label="Loading map"
      >
        <div className="text-center px-6 animate-pulse">
          <svg className="mx-auto h-20 w-20 text-surface-300 dark:text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="mt-4 text-surface-500 dark:text-surface-400">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`
        aspect-video relative min-h-[400px] rounded-2xl overflow-hidden
        border border-surface-200 dark:border-surface-700
        ${className}
      `}
      role="region"
      aria-label="Interactive fuel station map"
    >
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm shadow-card border border-surface-200 dark:border-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          onClick={() => mapInstanceRef.current?.zoomIn()}
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm shadow-card border border-surface-200 dark:border-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          onClick={() => mapInstanceRef.current?.zoomOut()}
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm shadow-card border border-surface-200 dark:border-surface-700 flex items-center justify-center text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  mapInstanceRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 15, { animate: true });
                },
                () => {},
                { enableHighAccuracy: true, timeout: 10000 }
              );
            }
          }}
          aria-label="Center on my location"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {selectedStation && (
        <div
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 md:bottom-4 md:top-auto"
          role="region"
          aria-label="Selected station details"
        >
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700 p-4 animate-slide-up">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate">
                  {selectedStation.name}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 truncate">
                  {selectedStation.address}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStationClick?.(selectedStation)}
                className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                aria-label="Close station info"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedStation.fuelTypes.filter((f) => f.available).map((fuel) => (
                <span
                  key={fuel.type}
                  className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg text-xs font-medium"
                >
                  {fuel.type.replace('_', ' ').toUpperCase()}: ₹{fuel.price?.toFixed(2)} {fuel.unit}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {selectedStation.distance?.toFixed(1)} km
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {selectedStation.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};