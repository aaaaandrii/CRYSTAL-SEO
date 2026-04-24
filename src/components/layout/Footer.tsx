import Link from 'next/link';
import { footerColumns } from '@/data/footer';

export function Footer() {
  return (
    <footer className="bg-black pt-5 pb-3">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Main Footer Grid */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
          {/* Brand Column */}
          <div className="shrink-0 lg:w-1/2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#e4e8ef] transition-colors hover:text-white"
            >
              {/* Crystal icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3L2 12l10 9 10-9L12 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8L6 12l6 4 6-4-6-4z"
                />
              </svg>
              <span className="text-[13px] font-semibold tracking-tight">
                5D Memory Crystal{' '}
                <span className="text-[9px] align-super">™</span>
              </span>
            </Link>
            <p className="mt-1.5 max-w-[240px] text-[12px] leading-[15px] font-semibold text-[#aaa]">
              Encoding humanity&apos;s most important data into fused quartz glass — built to last billions of years.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-5 sm:gap-1.5 lg:gap-2">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-1 sm:gap-0.5">
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#888]">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-0.5 sm:gap-0">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[12px] leading-tight font-semibold text-[#bbb] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
