'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mainNavItems, ctaNavItems } from '@/data/navigation';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#d0d0d0] bg-[#e3e7ee]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between lg:h-[77px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              {/* Crystal symbol video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-8 w-8 shrink-0 object-contain mix-blend-multiply"
              >
                <source src="/videos/logo-symbol.mp4" type="video/mp4" />
              </video>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/crystal-logo.svg"
                alt="5D Memory Crystal"
                className="h-[18px] w-auto sm:h-[22px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-3 lg:flex">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-semibold uppercase text-black transition-colors hover:text-[#5a72be]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href={ctaNavItems[0].href}
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#5a72be] bg-transparent px-5 text-[12px] font-semibold text-[#5a72be] transition-all hover:bg-[#5a72be]/10"
              >
                {ctaNavItems[0].label}
              </Link>
              <Link
                href={ctaNavItems[1].href}
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#5a72be] bg-[#5a72be] px-5 text-[12px] font-semibold text-white transition-all hover:bg-[#4d63a8]"
              >
                {ctaNavItems[1].label}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-black transition-colors hover:text-[#5a72be] lg:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
