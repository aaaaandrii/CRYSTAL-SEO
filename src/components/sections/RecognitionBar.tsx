'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface RecognitionContent {
  heading: string;
  bottomText: string;
}

interface MediaQuote {
  quote: string;
  source: React.ReactNode;
}

const defaultContent: RecognitionContent = {
  heading: 'Recognised by worlds leading media',
  bottomText: 'Our crystal technology even appeared in Mission: Impossible — The Final Reckoning and has been exhibited at the V&A Museum in London.',
};

const defaultQuotes: MediaQuote[] = [
  { quote: 'Data storage that could outlast civilisation itself', source: 'WIRED' },
  { quote: 'The everlasting ‘memory crystals’ that could slash data emissions', source: 'BBC' },
  { quote: 'The future of long-term data storage is clear and will last 14 billion years', source: 'The Register' },
];

export default function RecognitionBar({
  content,
  quotes,
}: {
  content?: Partial<RecognitionContent>;
  quotes?: MediaQuote[];
}) {
  const c = { ...defaultContent, ...content };
  const mediaQuotes = quotes && quotes.length > 0 ? quotes : defaultQuotes;

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
          {c.heading}
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
              <div className="relative flex items-center justify-center gap-0">
                <Image
                  src="/icons/laurel-left.svg"
                  alt=""
                  width={85}
                  height={154}
                  className="h-[72px] w-auto shrink-0 sm:h-[105px]"
                  aria-hidden="true"
                />
                <blockquote className="w-[121px] shrink-0 px-1 text-center text-[14px] font-bold leading-none tracking-[-0.5px] text-[#e3e7ee] sm:w-[161px] sm:text-[17px] lg:w-[177px] lg:text-[21px]">
                  {item.quote}
                </blockquote>
                <Image
                  src="/icons/laurel-right.svg"
                  alt=""
                  width={86}
                  height={154}
                  className="h-[72px] w-auto shrink-0 sm:h-[105px]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase text-[#e3e7ee]">
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
          className="mx-auto mt-16 max-w-[530px] text-center text-[14px] font-semibold leading-none text-[#e3e7ee]/70 md:mt-20"
        >
          {c.bottomText}
        </motion.p>
      </div>
    </section>
  );
}
