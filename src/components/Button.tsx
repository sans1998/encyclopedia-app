import React from 'react';
import { cn } from '../utils/classNames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isFullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
      outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeClasses = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
          variantClasses[variant],
          sizeClasses[size],
          isFullWidth ? 'w-full' : '',
          disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 