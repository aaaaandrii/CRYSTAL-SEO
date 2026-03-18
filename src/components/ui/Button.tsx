import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'border border-[#5a72be] bg-[#5a72be] text-white hover:bg-[#4d63a8]',
  secondary: 'border border-[#5a72be] bg-[#5a72be] text-white hover:bg-[#4d63a8]',
  outline: 'border border-[#5a72be] bg-transparent text-[#5a72be] hover:bg-[#5a72be]/10',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[50px] px-7 text-[12px]',
  md: 'h-[55px] px-8 text-[12px]',
  lg: 'h-[65px] px-10 text-[12px]',
};

export default function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5a72be] disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ('href' in rest && rest.href) {
    return <Link href={rest.href} className={classes}>{children}</Link>;
  }

  return <button className={classes} {...(rest as ButtonAsButton)}>{children}</button>;
}
