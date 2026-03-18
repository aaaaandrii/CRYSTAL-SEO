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
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        'text-[40px] font-bold leading-none tracking-[-1.2px] lg:text-[42px]',
        dark ? 'text-white' : 'text-[#1a1a1a]'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-[17px] font-semibold leading-[22px]',
          dark ? 'text-[#bbb]' : 'text-[#555]'
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
