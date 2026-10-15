import { HealthIndicator } from '../health/HealthIndicator';
import { useHealth } from '../../hooks/useHealth';
import type { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showHealth?: boolean;
  showLocation?: boolean;
  location?: string;
  onLocationClick?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

export const Header = ({
  title = 'FuelFlow',
  subtitle = 'Find fuel. Skip the queue.',
  showHealth = true,
  showLocation = true,
  location,
  onLocationClick,
  rightAction,
  className = '',
}: HeaderProps) => {
  const { health, loading: healthLoading, error: healthError, refetch: refetchHealth } = useHealth();

  return (
    <header
      className={`
        sticky top-0 z-40
        bg-white/80 dark:bg-surface-900/80
        backdrop-blur-xl
        border-b border-surface-200 dark:border-surface-700
        ${className}
      `}
      role="banner"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <svg
                className="w-8 h-8 text-brand-600 dark:text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="48" fill="#22c55e" />
                <path
                  d="M50 20 L50 50 L30 30 M50 50 L70 30"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="50" cy="75" r="8" fill="white" opacity="0.9" />
                <circle cx="50" cy="75" r="4" fill="#22c55e" />
              </svg>
              <div className="hidden sm:block">
                <h1 className="text-heading-sm font-bold text-surface-900 dark:text-surface-100 truncate">
                  {title}
                </h1>
                <p className="text-caption text-surface-500 dark:text-surface-400 truncate">
                  {subtitle}
                </p>
              </div>
            </div>

            {showLocation && (
              <button
                type="button"
                className={`
                  hidden md:flex items-center gap-1.5
                  px-3 py-1.5 rounded-xl
                  bg-surface-100 dark:bg-surface-800
                  text-sm font-medium text-surface-700 dark:text-surface-300
                  hover:bg-surface-200 dark:hover:bg-surface-700
                  transition-colors duration-150
                  cursor-pointer
                `}
                onClick={onLocationClick}
                aria-label="Change location"
              >
                <svg className="w-4 h-4 text-surface-500 dark:text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium truncate max-w-[160px]">
                  {location || 'Mumbai, Maharashtra'}
                </span>
                <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {showHealth && (
              <HealthIndicator
                health={health}
                loading={healthLoading}
                error={healthError}
                onRetry={refetchHealth}
              />
            )}
            {rightAction}
          </div>
        </div>
      </div>
    </header>
  );
};