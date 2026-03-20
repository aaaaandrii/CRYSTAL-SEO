import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await prisma.caseStudy.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!study) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: study.title,
    description: study.excerpt,
    alternates: {
      canonical: `${SITE_URL}/case-studies/${study.slug}`,
    },
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: 'article',
      images: [
        {
          url: study.imageUrl,
          alt: study.imageAlt || study.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!study || !study.published) {
    notFound();
  }

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.excerpt,
    image: study.imageUrl,
    datePublished: study.publishedAt?.toISOString(),
    dateModified: study.updatedAt.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/case-studies/${study.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={caseStudyJsonLd} />

      <article>
        {/* Hero Image */}
        <div className="relative h-64 w-full bg-[#e4e8ef] sm:h-80 md:h-96">
          <Image
            src={study.imageUrl}
            alt={study.imageAlt || study.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e4e8ef] via-[#e4e8ef]/50 to-transparent" />
        </div>

        {/* Content */}
        <section className="bg-[#e4e8ef] py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              {/* Back link */}
              <Link
                href="/case-studies"
                className="inline-flex items-center text-[14px] font-semibold text-[#5a72be] transition-colors hover:text-[#4d63a8]"
              >
                &larr; Back to Case Studies
              </Link>

              {/* Title & Client */}
              <h1 className="mt-6 text-[32px] font-bold leading-none tracking-[-1px] text-[#1a1a1a] sm:text-[40px] lg:text-[48px]">
                {study.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[14px] font-semibold text-[#888]">
                <span className="rounded-full bg-[#5a72be]/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-wider text-[#5a72be]">
                  {study.sector}
                </span>
                <span className="text-[#555]">{study.client}</span>
                {study.publishedAt && (
                  <>
                    <span className="text-[#d0d0d0]">|</span>
                    <time dateTime={study.publishedAt.toISOString()}>
                      {formatDate(study.publishedAt)}
                    </time>
                  </>
                )}
              </div>

              {/* Challenge / Solution / Outcome */}
              <div className="mt-12 space-y-10">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1a1a1a]">
                    Challenge
                  </h2>
                  <p className="mt-3 text-[14px] font-semibold leading-none text-[#555]">
                    {study.challenge}
                  </p>
                </div>

                <div>
                  <h2 className="text-[20px] font-bold text-[#1a1a1a]">
                    Solution
                  </h2>
                  <p className="mt-3 text-[14px] font-semibold leading-none text-[#555]">
                    {study.solution}
                  </p>
                </div>

                <div>
                  <h2 className="text-[20px] font-bold text-[#1a1a1a]">
                    Outcome
                  </h2>
                  <p className="mt-3 text-[14px] font-semibold leading-none text-[#555]">
                    {study.outcome}
                  </p>
                </div>
              </div>

              {/* Full Content */}
              <div
                className="prose mt-12 max-w-none border-t border-[#d0d0d0] pt-10 prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-p:text-[#555] prose-p:font-semibold prose-a:text-[#5a72be] prose-strong:text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: study.content }}
              />

              {/* CTA */}
              <div className="mt-12 flex flex-wrap gap-4 border-t border-[#d0d0d0] pt-8">
                <Button href="/schedule-demo">Schedule a Demo</Button>
                <Button href="/case-studies" variant="outline">
                  More Case Studies
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
