import Link from 'next/link';
import { footerColumns } from '@/data/footer';

export function Footer() {
  return (
    <footer className="bg-[#2a2a2a] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Main Footer Grid */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-12">
          {/* Brand Column */}
          <div className="shrink-0 lg:w-[340px]">
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
              <span className="text-xl font-semibold tracking-tight">
                5D Memory Crystal{' '}
                <span className="text-sm align-super">™</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[240px] text-[17px] leading-[17px] font-semibold text-[#aaa]">
              Encoding humanity&apos;s most important data into fused quartz glass — built to last billions of years.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#888]">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[17px] font-semibold text-[#bbb] transition-colors hover:text-white"
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
