import { type ReactNode } from 'react';
import { Badge } from '../ui/Badge';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  badge?: string | number;
  href?: string;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  items: NavItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  className?: string;
}

export const BottomNavigation = ({
  items,
  activeItem,
  onItemClick,
  className = '',
}: BottomNavigationProps) => {
  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-white dark:bg-surface-900
        border-t border-surface-200 dark:border-surface-700
        shadow-nav
        safe-area-inset-bottom
        ${className}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1
                flex-1 min-w-0
                transition-all duration-200 ease-spring
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                focus-visible:ring-offset-surface-950 dark:focus-visible:ring-offset-surface-900
              `}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <span
                className={`
                  relative text-lg transition-transform duration-200
                  ${isActive ? 'text-brand-600 dark:text-brand-400 scale-110' : 'text-surface-400 dark:text-surface-500'}
                `}
                aria-hidden="true"
              >
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </span>
              <span
                className={`
                  text-caption font-medium transition-colors duration-200
                  ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-surface-500 dark:text-surface-400'}
                  truncate
                `}
              >
                {item.label}
              </span>
              {item.badge && (
                <Badge variant="danger" size="sm" className="-top-1 -right-1 absolute">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};