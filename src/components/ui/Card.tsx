import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ href, className, children }: CardProps) {
  const classes = cn(
    'rounded-2xl border border-brand-border bg-brand-navy p-6 transition-all duration-300',
    href && 'hover:border-brand-accent/30 hover:bg-brand-blue/30 hover:shadow-lg hover:shadow-brand-accent/5 cursor-pointer',
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block')}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
