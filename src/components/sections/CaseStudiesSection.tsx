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
            <h2 className="mb-4 text-[40px] font-bold leading-[54px] tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              {content.heading}
            </h2>
            <p className="max-w-[455px] text-[18px] font-semibold leading-[18px] text-[#555]">
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
                <p className="text-[15px] font-bold leading-[21px] text-[#1a1a1a] opacity-50">
                  {study.sector
                    ? study.sector.charAt(0).toUpperCase() + study.sector.slice(1)
                    : 'General'}
                </p>
                <h3 className="text-[31px] font-semibold leading-[31px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                  {study.client}
                </h3>
                <p className="line-clamp-3 text-[17px] font-semibold leading-[17px] text-[#555]">
                  {study.excerpt}
                </p>
                <span className="text-[12px] font-semibold uppercase leading-[16px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                  Case Study →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Cases button with arrows */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <svg width="35" height="8" viewBox="0 0 35 8" fill="none" className="text-[#2a2a2a]">
              <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM35 3.5L1 3.5V4.5L35 4.5V3.5Z" fill="currentColor"/>
            </svg>
            <Link
              href={content.ctaHref}
              className="inline-flex h-[74px] w-[213px] items-center justify-center rounded-[52px] border border-[#2a2a2a] text-[12px] font-semibold uppercase text-black transition-all hover:bg-black hover:text-white"
            >
              {content.ctaText}
            </Link>
            <svg width="35" height="8" viewBox="0 0 35 8" fill="none" className="text-[#2a2a2a]">
              <path d="M34.3536 4.35355C34.5488 4.15829 34.5488 3.84171 34.3536 3.64645L31.1716 0.464466C30.9763 0.269204 30.6597 0.269204 30.4645 0.464466C30.2692 0.659728 30.2692 0.976311 30.4645 1.17157L33.2929 4L30.4645 6.82843C30.2692 7.02369 30.2692 7.34027 30.4645 7.53553C30.6597 7.7308 30.9763 7.7308 31.1716 7.53553L34.3536 4.35355ZM0 4.5H34V3.5H0V4.5Z" fill="currentColor"/>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
