import React from 'react';
import { cn } from '@/utils/classNames';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  hoverable = false,
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-md',
    bordered: 'bg-white border border-gray-200',
  };
  
  const interactiveClasses = cn(
    onClick && 'cursor-pointer',
    hoverable && 'transition-shadow hover:shadow-lg'
  );

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn('px-6 py-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

export default Card; 