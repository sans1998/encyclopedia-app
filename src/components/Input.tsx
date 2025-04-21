import React from 'react';
import { cn } from '../utils/classNames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, fullWidth = false, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col space-y-2', fullWidth ? 'w-full' : '')}>
        {label && (
          <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400',
            'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            'rounded-md sm:text-sm',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          {...props}
        />
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 