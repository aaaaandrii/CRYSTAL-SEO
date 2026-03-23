import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent, getContentItems } from '@/lib/content';
import { sectors as defaultSectors } from '@/data/sectors';
import Link from 'next/link';

export default async function SectorsSection() {
  const content = await getPageContent('home', 'sectors', {
    label: 'What we offer',
    heading: 'Storage Solutions for Every Sector',
    subheading: 'From personal keepsakes to enterprise-grade archival, luxury goods, and blockchain verification.',
  });

  const sectors = await getContentItems<{ slug: string; title: string; description: string; image: string; icon: string }>(
    'sector',
    defaultSectors
  );

  return (
    <section id="sectors" className="border-t border-[#d0d0d0] bg-[#e4e8ef] py-20 md:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
              {content.label}
            </p>
            <h2 className="mb-3 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              {content.heading}
            </h2>
            <p className="text-[20px] font-semibold leading-none text-[#555]">
              {content.subheading}
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
                <div className="relative transition-transform duration-800 [transition-timing-function:cubic-bezier(0.95,0,0.05,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="flex min-h-[320px] flex-col gap-4 rounded-[22px] bg-white p-6 lg:justify-between lg:gap-0 [backface-visibility:hidden]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] lg:hidden">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div>
                      <h3 className="text-[21px] font-bold leading-none tracking-[-0.47px] text-[#1a1a1a] lg:text-[27px]">
                        {sector.title}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold leading-none text-[#555]">
                        {sector.description}
                      </p>
                      <span className="mt-3 inline-block text-[8px] font-semibold uppercase leading-[16px] text-[#1a1a1a]">
                        Explore →
                      </span>
                    </div>
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
                      <span className="mt-2 inline-block text-[8px] font-semibold uppercase text-white/80">
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
