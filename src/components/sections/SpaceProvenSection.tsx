import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const spaceFeatures = [
  {
    icon: '/icons/space/spacex.svg',
    text: 'Launched into solar orbit aboard SpaceX Missions',
  },
  {
    icon: '/icons/space/falcon.svg',
    text: 'Used both on SpaceX Falcon Heavy and Falcon 9',
  },
  {
    icon: '/icons/space/astrolab.svg',
    text: 'Used by AstroLab and LifeShip for off-world data preservation',
  },
  {
    icon: '/icons/space/radiation.svg',
    text: 'Resistant to cosmic radiation, vacuum, and extreme thermal cycling',
  },
];

export default function SpaceProvenSection() {
  return (
    <section id="space-proven" className="bg-black py-16 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Top: Image + Content row (image first on desktop) */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[80px]">
          {/* Left: Image */}
          <ScrollReveal direction="right" className="order-1 w-full flex-1 lg:order-2">
            <div className="relative aspect-square w-full lg:aspect-auto lg:h-[360px]">
              <Image
                src="/images/space-proven-2.png"
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Out of Earth Durability
              </p>
              <h2 className="text-[32px] font-bold leading-[38px] tracking-[-1.2px] text-white sm:text-[40px] sm:leading-[46px] lg:text-[60px] lg:leading-[54px]">
                Space Proven
              </h2>
              <p className="pt-1 text-[15px] font-semibold leading-[20px] text-white/70 sm:text-[17px] sm:leading-[22px] lg:leading-[17px]">
                5D Memory Crystal is the only data storage medium that has been deployed
                in space. From the SpaceX Falcon Heavy payload orbiting the Sun to the
                Arch Mission lunar library, our crystals carry humanity&apos;s knowledge
                beyond Earth — surviving the vacuum, radiation, and temperature extremes
                of space without degradation.
              </p>
              <Link
                href="/technology"
                className="inline-flex h-[52px] w-[200px] items-center justify-center rounded-[60px] bg-white text-[14px] font-semibold uppercase text-[#2a2a2a] transition-all hover:bg-[#e4e8ef] lg:h-[73px] lg:w-[242px] lg:text-[16px]"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: 4-column feature icons */}
        <ScrollReveal className="mt-8 lg:mt-10">
          <div className="grid grid-cols-2 gap-0 pt-5 lg:grid-cols-4">
            {spaceFeatures.map((feature) => (
              <div
                key={feature.text}
                className="flex flex-col items-center gap-2 px-2 py-4 text-center lg:gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feature.icon}
                  alt=""
                  className="h-[30px] w-auto"
                />
                <p className="max-w-[263px] text-[13px] font-semibold leading-[16px] text-white sm:text-[14px] sm:leading-[17px] lg:text-[14px] lg:leading-[18px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
