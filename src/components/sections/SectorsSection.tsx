import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { sectors } from '@/data/sectors';
import Link from 'next/link';

export default function SectorsSection() {
  return (
    <section id="sectors" className="border-t border-[#d0d0d0] bg-[#e4e8ef] py-20 md:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              What we offer
            </p>
            <h2 className="mb-3 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Storage Solutions for Every Sector
            </h2>
            <p className="text-[20px] font-semibold leading-none text-[#555]">
              From personal keepsakes to enterprise-grade archival, luxury goods, and blockchain verification.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-column card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector, index) => (
            <ScrollReveal key={sector.slug} delay={index * 0.06}>
              <Link
                href={`/services#${sector.slug}`}
                className="group block [perspective:1000px]"
              >
                <div className="relative transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front — in flow, sets the card height */}
                  <div className="flex flex-col gap-3 rounded-[22px] bg-white px-6 py-8 [backface-visibility:hidden]">
                    <div className="relative h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        sizes="42px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-[30px] font-bold leading-none tracking-[-0.47px] text-[#1a1a1a] lg:text-[39px]">
                      {sector.title}
                    </h3>
                    <p className="flex-1 text-[17px] font-semibold leading-[17px] text-[#555]">
                      {sector.description}
                    </p>
                    <span className="text-[12px] font-semibold uppercase leading-[16px] text-[#1a1a1a]">
                      Explore →
                    </span>
                  </div>
                  {/* Back — absolute, matches front height */}
                  <div className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-[24px] font-bold leading-none text-white">
                        {sector.title}
                      </h3>
                      <span className="mt-2 inline-block text-[12px] font-semibold uppercase text-white/80">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
