import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'See how organisations around the world use 5D Memory Crystal technology to preserve their most critical data.',
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Case Studies
            </h1>
            <p className="mx-auto mt-4 max-w-[455px] text-[17px] font-semibold leading-[22px] text-[#555]">
              Real-world stories of data preservation across industries.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-[#e4e8ef] py-0 pb-20 md:pb-[88px]">
        <Container>
          {caseStudies.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="group flex flex-col gap-[13px] rounded-[40px] bg-white px-5 pb-[30px] pt-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="relative h-[282px] overflow-hidden rounded-[22px]">
                    <Image
                      src={study.imageUrl}
                      alt={study.imageAlt || study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-[15px] font-bold leading-[21px] text-[#1a1a1a] opacity-50">
                    {study.sector
                      ? study.sector.charAt(0).toUpperCase() + study.sector.slice(1)
                      : 'General'}
                  </p>
                  <h2 className="text-[31px] font-semibold leading-[31px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                    {study.client}
                  </h2>
                  <p className="line-clamp-3 text-[17px] font-semibold leading-[17px] text-[#555]">
                    {study.excerpt}
                  </p>
                  <span className="text-[12px] font-semibold uppercase leading-[16px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                    Case Study →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-[17px] font-semibold text-[#555]">
                No case studies published yet. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
