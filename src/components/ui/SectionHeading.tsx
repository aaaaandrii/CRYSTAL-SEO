import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 max-w-3xl md:mb-16',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        'text-[32px] font-bold leading-none tracking-tight sm:text-[38px] lg:text-[42px]',
        dark ? 'text-white' : 'text-[#1a1a1a]'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-[14px] font-semibold leading-none',
          dark ? 'text-[#bbb]' : 'text-[#555]'
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
