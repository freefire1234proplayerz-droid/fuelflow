import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface LocationPermissionProps {
  onGranted: (position: GeolocationPosition) => void;
  onDenied: () => void;
  className?: string;
}

export const LocationPermission = ({
  onGranted,
  onDenied,
  className = '',
}: LocationPermissionProps) => {
  const [status, setStatus] = useState<'prompt' | 'granted' | 'denied' | 'loading'>('prompt');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('denied');
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
      setStatus(permission.state);
      permission.onchange = () => setStatus(permission.state);
    }).catch(() => {
      setStatus('prompt');
    });
  }, []);

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      onDenied();
      return;
    }

    setStatus('loading');
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('granted');
        onGranted(position);
      },
      (err) => {
        setStatus('denied');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location permission was denied. Please enable it in your browser settings.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable. Please try again.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out. Please try again.');
            break;
          default:
            setError('An unknown error occurred while getting your location.');
        }
        onDenied();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleOpenSettings = () => {
    if (typeof window !== 'undefined') {
      window.open('https://support.google.com/chrome/answer/142065', '_blank');
    }
  };

  if (status === 'granted') {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-sm p-5 ${className}`} role="region" aria-label="Location permission">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100 mb-2">
          Enable Location Access
        </h3>
        <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-sm mx-auto">
          FuelFlow needs your location to find nearby fuel stations and show accurate distances.
          Your location is only used locally and never stored.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleRequestLocation}
            disabled={status === 'loading'}
            loading={status === 'loading'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {status === 'loading' ? 'Locating...' : 'Use My Location'}
          </Button>

          {status === 'denied' && (
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleOpenSettings}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open Browser Settings
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="md"
            className="w-full"
            onClick={onDenied}
          >
            Enter Location Manually
          </Button>
        </div>
      </div>
    </div>
  );
};