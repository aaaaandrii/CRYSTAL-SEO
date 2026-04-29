import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent } from '@/lib/content';

const featureIcons = [
  '/icons/swiss/chain-of-custody.svg',
  '/icons/swiss/air-gapped.svg',
  '/icons/swiss/no-third-party.svg',
  '/icons/swiss/tamper-evident.svg',
];

export default async function SwissMadeSection() {
  const content = await getPageContent('home', 'swiss-made', {
    label: 'Security & Provenance',
    heading: 'Swiss Made',
    description: 'Every 5D Memory Crystal™ is produced in a secure Swiss facility — combining the highest standards of precision engineering with world-renowned data privacy protections. From raw fused quartz to finished crystal, the entire process takes place under controlled, auditable conditions.',
    ctaText: 'Learn More',
    ctaHref: '/process',
    image: '/images/swiss-facility.png',
    features: [
      'Swiss-based production with full chain of custody',
      'Air-gapped encoding — your data never touches the internet',
      'No third-party access at any stage of manufacturing',
      'Tamper-evident packaging and secure delivery',
    ],
  });

  return (
    <section id="swiss-made" className="bg-[#e4e8ef] py-16 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Top: Image + Content row */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[80px]">
          {/* Left: Image — square 1:1 */}
          <ScrollReveal direction="left" className="w-full flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-[30px] lg:rounded-[50px]">
              <Image
                src={content.image}
                alt="5D Memory Crystal Swiss manufacturing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right" className="w-full flex-1">
            <div className="flex flex-col items-start gap-4 lg:gap-5">
              <p className="text-xs font-semibold uppercase text-[#888]">
                {content.label}
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
                {content.heading}
              </h2>
              <p className="max-w-[392px] pt-2 text-[14px] font-semibold leading-none text-[#555]">
                {content.description}
              </p>
              <Link
                href={content.ctaHref}
                className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full bg-black text-[12px] font-semibold text-white transition-all hover:bg-[#2a2a2a]"
              >
                {content.ctaText}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: 4-column feature icons */}
        <ScrollReveal className="mt-8 lg:mt-10">
          <div className="grid grid-cols-2 gap-0 pt-5 lg:grid-cols-4">
            {content.features.map((text: string, i: number) => (
              <div
                key={text}
                className="flex flex-col items-center gap-2 border-b border-[#d0d0d0] px-2 py-4 text-center lg:gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featureIcons[i] || featureIcons[0]}
                  alt=""
                  className="h-[30px] w-auto"
                />
                <p className="max-w-[238px] text-[13px] font-semibold leading-[16px] text-black sm:text-[14px] sm:leading-[17px] lg:text-[15px] lg:leading-[18px]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
