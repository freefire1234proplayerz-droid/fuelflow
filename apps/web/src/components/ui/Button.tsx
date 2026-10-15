import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-200 ease-spring
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950
      disabled:opacity-50 disabled:cursor-not-allowed
      dark:disabled:opacity-40
    `;

    const variants = {
      primary: `
        bg-brand-600 text-white
        hover:bg-brand-700 active:bg-brand-800
        shadow-card
      `,
      secondary: `
        bg-surface-200 text-surface-900
        hover:bg-surface-300 active:bg-surface-400
        dark:bg-surface-700 dark:text-surface-100 dark:hover:bg-surface-600 dark:active:bg-surface-500
      `,
      outline: `
        border-2 border-surface-300 text-surface-700 bg-transparent
        hover:bg-surface-100 active:bg-surface-200
        dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:active:bg-surface-700
      `,
      ghost: `
        text-surface-700 bg-transparent
        hover:bg-surface-100 active:bg-surface-200
        dark:text-surface-300 dark:hover:bg-surface-800 dark:active:bg-surface-700
      `,
      danger: `
        bg-red-600 text-white
        hover:bg-red-700 active:bg-red-800
        shadow-card
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
      xl: 'px-8 py-4 text-xl gap-3',
    };

    const width = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';