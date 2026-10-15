import type { HealthResponse } from '@fuelflow/shared/types';

interface HealthIndicatorProps {
  health: HealthResponse | null;
  loading: boolean;
  error: Error | null;
  onRetry?: () => void;
  variant?: 'badge' | 'minimal' | 'full';
  className?: string;
}

export const HealthIndicator = ({
  health,
  loading,
  error,
  onRetry,
  variant = 'badge',
  className = '',
}: HealthIndicatorProps) => {
  if (variant === 'minimal') {
    if (loading) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500"></span>
          </span>
          <span className="text-xs font-medium">Checking...</span>
        </span>
      );
    }

    if (error) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm" role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs font-medium">Offline</span>
        </span>
      );
    }

    if (!health) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-sm">
          <span className="text-xs font-medium">Unknown</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        <span className="text-xs font-medium">Online</span>
        {health.version && (
          <span className="text-xs bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">{health.version}</span>
        )}
      </span>
    );
  }

  if (loading) {
    return (
      <div className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-sm
        ${className}
      `} role="status">
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm font-medium">Checking connection...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm
        ${className}
      `} role="alert">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-sm font-medium">API Offline</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs underline hover:no-underline ml-1"
            aria-label="Retry connection"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!health) {
    return (
      <div className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-sm
        ${className}
      `}>
        <span className="text-sm font-medium">Unknown</span>
      </div>
    );
  }

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm
      ${className}
    `}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-sm font-medium">API Online</span>
      {health.version && (
        <span className="text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">{health.version}</span>
      )}
    </div>
  );
};