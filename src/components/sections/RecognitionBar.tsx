'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const mediaQuotes = [
  {
    quote: 'Data storage that could outlast civilisation itself',
    source: 'WIRED',
  },
  {
    quote: 'Most durable data storage material in the world',
    source: 'Guinness World Records',
  },
  {
    quote: 'Groundbreaking university research project',
    source: 'The Telegraph',
  },
];

export default function RecognitionBar() {
  return (
    <section id="recognition" className="border-t border-black bg-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-[430px] text-center text-[39px] font-bold leading-none tracking-[-0.47px] text-[#e3e7ee] md:mb-20"
        >
          Recognised by worlds leading media
        </motion.h2>

        {/* Quote cards with laurel wreaths */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {mediaQuotes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              {/* Laurel wreath + quote */}
              <div className="relative flex items-center justify-center gap-0">
                {/* Left laurel */}
                <Image
                  src="/icons/laurel-left.svg"
                  alt=""
                  width={85}
                  height={154}
                  className="h-[90px] w-auto shrink-0 sm:h-[130px]"
                  aria-hidden="true"
                />

                {/* Quote text */}
                <blockquote className="w-[150px] shrink-0 px-1 text-center text-[17px] font-bold leading-none tracking-[-0.5px] text-[#e3e7ee] sm:w-[200px] sm:text-[22px] lg:w-[220px] lg:text-[26px]">
                  {item.quote}
                </blockquote>

                {/* Right laurel */}
                <Image
                  src="/icons/laurel-right.svg"
                  alt=""
                  width={86}
                  height={154}
                  className="h-[90px] w-auto shrink-0 sm:h-[130px]"
                  aria-hidden="true"
                />
              </div>

              {/* Source label */}
              <p className="mt-4 text-[14px] font-semibold uppercase text-[#e3e7ee]">
                {item.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-16 max-w-[530px] text-center text-[20px] font-semibold leading-none text-[#e3e7ee]/70 md:mt-20"
        >
          Our crystal technology even appeared in Mission: Impossible — The Final
          Reckoning and has been exhibited at the V&A Museum in London.
        </motion.p>
      </div>
    </section>
  );
}
