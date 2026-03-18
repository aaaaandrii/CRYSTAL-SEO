import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import NewsGrid from './NewsGrid';

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'The latest on 5D optical storage — research breakthroughs, partnerships, media coverage, and events.',
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
};

export default async function NewsPage() {
  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Latest Updates
            </p>
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              News &amp; Events
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] font-semibold leading-[22px] text-[#555]">
              The latest on 5D optical storage — research breakthroughs,
              partnerships, media coverage, and events.
            </p>
          </div>

        </Container>
      </section>

      {/* Filter + Articles Grid */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <NewsGrid
            articles={articles.map((a) => ({
              id: a.id,
              slug: a.slug,
              title: a.title,
              excerpt: a.excerpt,
              imageUrl: a.imageUrl,
              imageAlt: a.imageAlt,
              tags: a.tags,
              publishedAt: a.publishedAt?.toISOString() ?? null,
            }))}
          />
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Newsletter
            </p>
            <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#bbb]">
              Subscribe to our newsletter for the latest breakthroughs and
              announcements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/schedule-demo" size="lg">
                Subscribe
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
