import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent } from '@/lib/content';

export default async function CaseStudiesSection() {
  const content = await getPageContent('home', 'case-studies', {
    heading: 'Case Studies',
    description: 'From space missions to cultural institutions — see who is preserving their most critical data with us.',
    ctaText: 'View All Cases',
    ctaHref: '/case-studies',
  });

  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 4,
  });

  if (caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="bg-[#e4e8ef] py-20 md:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Heading */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <h2 className="mb-4 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              {content.heading}
            </h2>
            <p className="max-w-[455px] text-[14px] font-semibold leading-none text-[#555]">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 0.1}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col gap-[13px] rounded-[40px] bg-white px-5 pb-[30px] pt-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="relative h-[282px] overflow-hidden rounded-[22px]">
                  <Image
                    src={study.imageUrl}
                    alt={study.imageAlt || study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="text-xs font-semibold uppercase text-[#1a1a1a]/50">
                  {study.sector
                    ? study.sector.charAt(0).toUpperCase() + study.sector.slice(1)
                    : 'General'}
                </p>
                <h3 className="text-[31px] font-semibold leading-[31px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                  {study.client}
                </h3>
                <p className="line-clamp-3 text-[14px] font-semibold leading-none text-[#555]">
                  {study.excerpt}
                </p>
                <span className="text-[8px] font-semibold uppercase leading-[16px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                  Case Study →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Cases button with arrows */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <Link
              href={content.ctaHref}
              className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-[#2a2a2a] text-[12px] font-semibold text-black transition-all hover:bg-black hover:text-white"
            >
              {content.ctaText}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
