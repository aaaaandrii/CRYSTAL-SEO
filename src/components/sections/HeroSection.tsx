'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#e4e8ef]">
      <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-16 sm:px-[50px] lg:py-0">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full shrink-0 text-center lg:w-[550px] lg:text-left"
          >
            {/* Badges */}
            <div className="mb-2.5 flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:justify-start">
              <span className="inline-flex items-center gap-[5px] text-[9px] font-medium leading-none tracking-[-0.03em] text-black/40 sm:gap-[7px] sm:text-[11px]">
                <Image src="/icons/badge-swiss.svg" alt="" width={21} height={18} className="h-[14px] w-auto shrink-0 sm:h-[18px]" aria-hidden />
                Made in Switzerland
              </span>
              <span className="inline-flex items-center gap-[5px] text-[9px] font-medium leading-none tracking-[-0.03em] text-black/40 sm:gap-[7px] sm:text-[11px]">
                <Image src="/icons/badge-guinness.svg" alt="" width={14} height={13} className="h-[11px] w-auto shrink-0 sm:h-[13px]" aria-hidden />
                Guinness World Record
              </span>
              <span className="inline-flex items-center gap-[5px] text-[9px] font-medium leading-none tracking-[-0.03em] text-black/40 sm:gap-[7px] sm:text-[11px]">
                <Image src="/icons/badge-secure.svg" alt="" width={17} height={18} className="h-[14px] w-auto shrink-0 sm:h-[18px]" aria-hidden />
                Private and Secure
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[32px] font-bold leading-none tracking-[-0.02em] text-[#1a1a1a] sm:text-[44px] lg:text-[53px]">
              The Most Durable Storage in the World<sup className="text-[0.5em]">*</sup>
            </h1>

            {/* Asterisk + Footnote */}
            <p className="mt-5 text-[11.5px] font-bold tracking-[-0.02em] text-[#1a1a1a]">
              *According to Guinness World Record Book
            </p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mx-auto mt-4 max-w-[342px] text-[14px] font-semibold leading-none text-[#555] lg:mx-0"
            >
              5D Memory Crystal encodes your most valuable digital assets into fused quartz glass — virtually indestructible, readable for billions of years, with zero ongoing energy cost.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-5 flex justify-center gap-2 lg:justify-start"
            >
              <Link
                href="/contact"
                className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-[#5a72be] bg-[#5a72be] text-[12px] font-semibold text-white transition-all hover:bg-[#4d63a8]"
              >
                Order Crystal
              </Link>
              <Link
                href="/technology"
                className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-[#5a72be] bg-[rgba(81,52,227,0.03)] text-[12px] font-semibold text-[#5a72be] transition-all hover:bg-[#5a72be]/10"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right / Below: Crystal Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-[400px] flex-1 lg:max-w-none"
          >
            {/* Video with mix-blend-multiply to blend with bg */}
            <div className="relative bg-[#e4e8ef]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-auto w-full mix-blend-multiply"
              >
                <source src="/videos/hero-main-video-upd.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Lifespan label */}
            <p className="mt-2 text-center text-[14px] font-bold tracking-[-0.03em] text-black/20">
              <span>LIFESPAN: </span>
              <span>100,000,000,000,000,000,000 YEARS</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
