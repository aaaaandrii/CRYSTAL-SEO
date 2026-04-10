import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent } from '@/lib/content';

const spaceFeatureIcons = [
  '/icons/space/spacex.svg',
  '/icons/space/falcon.svg',
  '/icons/space/astrolab.svg',
  '/icons/space/radiation.svg',
];

export default async function SpaceProvenSection() {
  const content = await getPageContent('home', 'space-proven', {
    label: 'Out of Earth Durability',
    heading: 'Space Proven',
    description: "5D Memory Crystal™ is a proven data storage medium that has been deployed in space. From the SpaceX Falcon Heavy payload orbiting the Sun to the Arch Mission lunar library, our crystals carry humanity's knowledge beyond Earth — surviving the vacuum, radiation, and temperature extremes of space without degradation.",
    ctaText: 'Learn More',
    ctaHref: '/technology',
    image: '/images/space-proven-2.png',
    features: [
      'Used by AstroLab for off-world data preservation',
      'Partnered with LifeShip for genetic preservation',
      'Featured in the MoonMars Museum collection',
      'Resistant to cosmic radiation, vacuum, and extreme thermal cycling',
    ],
  });

  return (
    <section id="space-proven" className="bg-black py-16 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Top: Image + Content row (image first on desktop) */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[80px]">
          {/* Left: Image */}
          <ScrollReveal direction="right" className="order-1 w-full flex-1 lg:order-2">
            <div className="relative aspect-square w-full lg:aspect-auto lg:h-[360px]">
              <Image
                src={content.image}
                alt="5D Memory Crystal deployed in space"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Left: Content */}
          <ScrollReveal direction="left" className="order-2 w-full flex-1 lg:order-1">
            <div className="flex flex-col items-start gap-4 lg:gap-5">
              <p className="text-xs font-semibold uppercase text-[#888]">
                {content.label}
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
                {content.heading}
              </h2>
              <p className="pt-1 text-[14px] font-semibold leading-none text-white/70">
                {content.description}
              </p>
              <Link
                href={content.ctaHref}
                className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full bg-white text-[12px] font-semibold text-[#2a2a2a] transition-all hover:bg-[#e4e8ef]"
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
                className="flex flex-col items-center gap-2 px-2 py-4 text-center lg:gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={spaceFeatureIcons[i] || spaceFeatureIcons[0]}
                  alt=""
                  className="h-[30px] w-auto"
                />
                <p className="max-w-[263px] text-[13px] font-semibold leading-[16px] text-white sm:text-[14px] sm:leading-[17px] lg:text-[14px] lg:leading-[18px]">
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
