import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const spaceFeatures = [
  'Launched into solar orbit aboard SpaceX Falcon Heavy (2018)',
  'Launched into solar orbit aboard SpaceX Falcon Heavy (2018)',
  'Resistant to cosmic radiation, vacuum, and extreme thermal cycling',
  'Used by AstroLab and LifeShip for off-world data preservation',
];

export default function SpaceProvenSection() {
  return (
    <section id="space-proven" className="overflow-hidden bg-black py-[88px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 sm:px-[50px] lg:flex-row lg:gap-[80px]">
        {/* Left: Content */}
        <ScrollReveal direction="left" className="w-full flex-1">
          <div>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Out of Earth Durability
            </p>
            <h2 className="mb-3 text-[40px] font-bold leading-[54px] tracking-[-1.2px] text-white lg:text-[60px]">
              Space Proven
            </h2>
            <p className="pt-2 text-[20px] font-semibold leading-[20px] text-[#bbb]">
              5D Memory Crystal is the only data storage medium that has been deployed
              in space. From the SpaceX Falcon Heavy payload orbiting the Sun to the
              Arch Mission lunar library, our crystals carry humanity&apos;s knowledge
              beyond Earth — surviving the vacuum, radiation, and temperature extremes
              of space without degradation.
            </p>

            {/* Feature list with dividers */}
            <ul className="py-3">
              {spaceFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="border-b border-[#d0d0d0] py-[10px]"
                >
                  <span className="ml-[21px] list-item list-disc text-[14px] font-semibold leading-[18px] text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/technology"
              className="inline-flex h-[73px] w-[242px] items-center justify-center rounded-[60px] bg-white text-[16px] font-semibold uppercase text-[#2a2a2a] transition-all hover:bg-[#e4e8ef]"
            >
              Learn More
            </Link>
          </div>
        </ScrollReveal>

        {/* Right: Image */}
        <ScrollReveal direction="right" className="relative h-[360px] w-full flex-1">
          <Image
            src="/images/space-proven.png"
            alt="5D Memory Crystal deployed in space"
            width={621}
            height={530}
            className="absolute -top-[34px] left-0 h-[530px] w-[621px] max-w-none object-cover"
            sizes="(max-width: 1024px) 100vw, 621px"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
