import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'success' | 'destructive' | 'outline' | 'ghost';

type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantMap: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-blue-700 focus:ring-blue-300',
  secondary: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300',
  success: 'bg-success text-success-foreground hover:bg-green-700 focus:ring-green-300',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-red-700 focus:ring-red-300',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

const sizeMap: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variantMap[variant], sizeMap[size], className)}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? 'Please wait…' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
