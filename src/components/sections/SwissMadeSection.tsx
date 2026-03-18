import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const features = [
  'Swiss-based production with full chain of custody',
  'Air-gapped encoding — your data never touches the internet',
  'No third-party access at any stage of manufacturing',
  'Tamper-evident packaging and secure delivery',
];

export default function SwissMadeSection() {
  return (
    <section id="swiss-made" className="bg-[#e4e8ef] py-[88px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 sm:px-[50px] lg:flex-row lg:gap-[80px]">
        {/* Left: Image with Swiss cross overlay */}
        <ScrollReveal direction="left" className="w-full flex-1">
          <div className="relative h-[400px] w-full overflow-hidden rounded-[50px] lg:h-[544px]">
            <Image
              src="/images/swiss-facility.png"
              alt="5D Memory Crystal Swiss manufacturing facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Swiss cross badge */}
            <div className="absolute right-8 top-5 flex h-[120px] w-[120px] items-center justify-center rounded-[30px] bg-[#da1818] lg:h-[162px] lg:w-[162px]">
              <div className="relative h-[80px] w-[30px] bg-white lg:h-[108px] lg:w-[40px]">
                <div className="absolute left-1/2 top-1/2 h-[30px] w-[80px] -translate-x-1/2 -translate-y-1/2 bg-white lg:h-[40px] lg:w-[108px]" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Content */}
        <ScrollReveal direction="right" className="w-full flex-1">
          <div>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Security &amp; Provenance
            </p>
            <h2 className="mb-3 text-[40px] font-bold leading-[54px] tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Swiss Made
            </h2>
            <p className="mb-0 max-w-[392px] pt-3 text-[17px] font-semibold leading-[17px] text-[#555]">
              Every 5D Memory Crystal is produced in a secure Swiss facility —
              combining the highest standards of precision engineering with
              world-renowned data privacy protections. From raw fused quartz to
              finished crystal, the entire process takes place under controlled,
              auditable conditions.
            </p>

            {/* Feature list with dividers */}
            <ul className="mb-0 pb-3 pt-5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="border-b border-[#d0d0d0] py-[10px]"
                >
                  <span className="ml-[22px] list-item list-disc text-[15px] font-semibold leading-[18px] text-black">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/technology"
              className="inline-flex h-[73px] w-[242px] items-center justify-center rounded-[60px] bg-black text-[16px] font-semibold uppercase text-white transition-all hover:bg-[#2a2a2a]"
            >
              Learn More
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
