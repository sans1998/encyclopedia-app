import React from 'react';
import { cn } from '@/utils/classNames';

interface LoadingProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  fullPage?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  className,
  size = 'medium',
  variant = 'primary',
  fullPage = false,
  text,
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const variantClasses = {
    primary: 'border-blue-500 border-b-transparent',
    secondary: 'border-gray-300 border-b-transparent',
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
        {text && <p className="mt-4 text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {spinner}
      {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
    </div>
  );
};

export default Loading; 