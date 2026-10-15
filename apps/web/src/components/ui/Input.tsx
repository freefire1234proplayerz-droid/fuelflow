import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  clearable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      clearable = false,
      className = '',
      id,
      value,
      onChange,
      onClick,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(error);
    const showClear = clearable && value && !props.disabled && !props.readOnly;

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400 dark:text-surface-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-xl border transition-all duration-200
              bg-white dark:bg-surface-800
              text-surface-900 dark:text-surface-100
              placeholder:text-surface-400 dark:placeholder:text-surface-500
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
              disabled:bg-surface-100 dark:disabled:bg-surface-700 disabled:cursor-not-allowed
              ${icon && iconPosition === 'left' ? 'pl-10' : ''}
              ${icon && iconPosition === 'right' ? 'pr-10' : ''}
              ${showClear ? 'pr-10' : ''}
              ${hasError
                ? 'border-red-400 dark:border-red-500 focus:ring-red-500'
                : 'border-surface-300 dark:border-surface-600 hover:border-surface-400 dark:hover:border-surface-500'
              }
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
            aria-label={label}
            {...props}
          />
          {(icon && iconPosition === 'right') || showClear ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {showClear ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 p-1 rounded-lg transition-colors"
                  aria-label="Clear input"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <span className="text-surface-400">{icon}</span>
              )}
            </div>
          ) : null}
        </div>
        {hasError && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {helperText && !hasError && (
          <p id={helperId} className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';