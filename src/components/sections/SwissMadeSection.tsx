import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const features = [
  {
    icon: '/icons/swiss/chain-of-custody.svg',
    text: 'Swiss-based production with full chain of custody',
  },
  {
    icon: '/icons/swiss/air-gapped.svg',
    text: 'Air-gapped encoding — your data never touches the internet',
  },
  {
    icon: '/icons/swiss/no-third-party.svg',
    text: 'No third-party access at any stage of manufacturing',
  },
  {
    icon: '/icons/swiss/tamper-evident.svg',
    text: 'Tamper-evident packaging and secure delivery',
  },
];

export default function SwissMadeSection() {
  return (
    <section id="swiss-made" className="bg-[#e4e8ef] py-16 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Top: Image + Content row */}
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[80px]">
          {/* Left: Image — square 1:1 */}
          <ScrollReveal direction="left" className="w-full flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-[30px] lg:rounded-[50px]">
              <Image
                src="/images/swiss-facility.png"
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Security &amp; Provenance
              </p>
              <h2 className="text-[32px] font-bold leading-[38px] tracking-[-1.2px] text-[#1a1a1a] sm:text-[40px] sm:leading-[46px] lg:text-[60px] lg:leading-[54px]">
                Swiss Made
              </h2>
              <p className="max-w-[392px] pt-2 text-[15px] font-semibold leading-[20px] text-[#555] sm:text-[17px] sm:leading-[22px] lg:leading-[17px]">
                Every 5D Memory Crystal is produced in a secure Swiss facility —
                combining the highest standards of precision engineering with
                world-renowned data privacy protections. From raw fused quartz to
                finished crystal, the entire process takes place under controlled,
                auditable conditions.
              </p>
              <Link
                href="/technology"
                className="inline-flex h-[52px] w-[200px] items-center justify-center rounded-[60px] bg-black text-[14px] font-semibold uppercase text-white transition-all hover:bg-[#2a2a2a] lg:h-[73px] lg:w-[242px] lg:text-[16px]"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: 4-column feature icons */}
        <ScrollReveal className="mt-8 lg:mt-10">
          <div className="grid grid-cols-2 gap-0 pt-5 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex flex-col items-center gap-2 border-b border-[#d0d0d0] px-2 py-4 text-center lg:gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feature.icon}
                  alt=""
                  className="h-[30px] w-auto"
                />
                <p className="max-w-[238px] text-[13px] font-semibold leading-[16px] text-black sm:text-[14px] sm:leading-[17px] lg:text-[15px] lg:leading-[18px]">
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
