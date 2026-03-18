'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavItems, ctaNavItems } from '@/data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-brand-dark border-l border-brand-border lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                <span className="text-brand-white font-semibold text-lg">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-brand-gray transition-colors hover:text-brand-white rounded-lg hover:bg-brand-white/5"
                  aria-label="Close menu"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {mainNavItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-4 py-3 text-base font-medium text-brand-gray transition-colors hover:text-brand-white rounded-lg hover:bg-brand-white/5"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Buttons */}
              <div className="px-6 py-6 border-t border-brand-border space-y-3">
                <Link
                  href={ctaNavItems[0].href}
                  onClick={onClose}
                  className="flex w-full items-center justify-center px-4 py-3 text-sm font-medium text-brand-white border border-brand-border rounded-lg transition-all hover:border-brand-accent/50 hover:bg-brand-accent/5"
                >
                  {ctaNavItems[0].label}
                </Link>
                <Link
                  href={ctaNavItems[1].href}
                  onClick={onClose}
                  className="flex w-full items-center justify-center px-4 py-3 text-sm font-medium text-brand-white bg-brand-accent rounded-lg transition-all hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/25"
                >
                  {ctaNavItems[1].label}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
