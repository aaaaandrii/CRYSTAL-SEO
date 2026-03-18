import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  });

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${SITE_URL}/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      images: [
        {
          url: article.imageUrl,
          alt: article.imageAlt || article.title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news/${article.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <article>
        {/* Hero Image */}
        <div className="relative h-64 w-full bg-[#e4e8ef] sm:h-80 md:h-96">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
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
                href="/news"
                className="inline-flex items-center text-[14px] font-semibold text-[#5a72be] transition-colors hover:text-[#4d63a8]"
              >
                &larr; Back to News
              </Link>

              {/* Title */}
              <h1 className="mt-6 text-[32px] font-bold leading-none tracking-[-1px] text-[#1a1a1a] sm:text-[40px] lg:text-[48px]">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[14px] font-semibold text-[#888]">
                {article.publishedAt && (
                  <time dateTime={article.publishedAt.toISOString()}>
                    {formatDate(article.publishedAt)}
                  </time>
                )}
                {article.sourceName && (
                  <>
                    <span className="text-[#d0d0d0]">|</span>
                    {article.source ? (
                      <a
                        href={article.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5a72be] underline underline-offset-4 hover:text-[#4d63a8]"
                      >
                        {article.sourceName}
                      </a>
                    ) : (
                      <span>{article.sourceName}</span>
                    )}
                  </>
                )}
              </div>

              {/* Article Body */}
              <div
                className="prose mt-10 max-w-none prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-p:text-[#555] prose-p:font-semibold prose-a:text-[#5a72be] prose-strong:text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Back link (bottom) */}
              <div className="mt-12 border-t border-[#d0d0d0] pt-8">
                <Link
                  href="/news"
                  className="inline-flex items-center text-[14px] font-semibold text-[#5a72be] transition-colors hover:text-[#4d63a8]"
                >
                  &larr; All News &amp; Updates
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
