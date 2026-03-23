'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SaveDataContent {
  heading: string;
  description: string;
  cta1Text: string;
  cta1Href: string;
  cta2Text: string;
  cta2Href: string;
}

const defaultContent: SaveDataContent = {
  heading: 'Save Your Most Valuable Data',
  description: '5D Memory Crystal is ideal for storing data, that you cannot afford to lose.',
  cta1Text: 'Order Crystal',
  cta1Href: '/contact',
  cta2Text: 'Schedule a Call',
  cta2Href: '/schedule-demo',
};

export default function SaveDataSection({ content }: { content?: Partial<SaveDataContent> }) {
  const c = { ...defaultContent, ...content };

  return (
    <section id="save-data" className="relative overflow-hidden bg-white">
      <div className="absolute left-1/2 top-0 h-[1100px] w-[1200px] -translate-x-1/2 lg:h-[1568px] lg:w-[1687px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full bg-[#e3e7ee] object-cover mix-blend-multiply"
        >
          <source src="/videos/save-data-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-40 sm:px-[50px] md:py-56">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="max-w-[702px] text-center text-[52px] font-bold leading-[0.9] tracking-[-1.9px] text-[#1a1a1a] sm:text-[72px] lg:text-[96px]"
        >
          {c.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 max-w-[373px] text-center text-[14px] font-semibold leading-none text-[#555]"
        >
          {c.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8 flex gap-2"
        >
          <Link
            href={c.cta1Href}
            className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-[#5a72be] bg-[#5a72be] text-[12px] font-semibold text-white transition-all hover:bg-[#4d63a8]"
          >
            {c.cta1Text}
          </Link>
          <Link
            href={c.cta2Href}
            className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-[#5a72be] bg-[rgba(81,52,227,0.03)] text-[12px] font-semibold text-[#5a72be] transition-all hover:bg-[#5a72be]/10"
          >
            {c.cta2Text}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
