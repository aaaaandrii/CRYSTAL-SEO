import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatDate } from '@/lib/utils';
import { getPageContent } from '@/lib/content';

export default async function NewsSection() {
  const content = await getPageContent('home', 'news', {
    label: 'Latest News',
    heading: 'News & Updates',
    ctaText: 'View All News',
    ctaHref: '/news',
  });

  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  if (articles.length === 0) return null;

  return (
    <section id="news" className="bg-black py-20 md:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Heading */}
        <ScrollReveal>
          <div className="mb-10 md:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
              {content.label}
            </p>
            <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              {content.heading}
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 0.1}>
              <Link
                href={`/news/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-[22px] bg-[#1a1a1a] transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-[10px] p-6">
                  {article.publishedAt && (
                    <p className="text-xs font-semibold uppercase text-[#888]">
                      {formatDate(article.publishedAt)}
                    </p>
                  )}
                  <h3 className="text-[20px] font-bold leading-[20px] text-white transition-colors group-hover:text-[#5a72be]">
                    {article.title}
                  </h3>
                  <p className="line-clamp-4 text-[14px] font-semibold leading-none text-[#bbb]">
                    {article.excerpt}
                  </p>
                  <span className="text-[8px] font-semibold uppercase leading-[16px] text-white transition-colors group-hover:text-[#5a72be]">
                    Read more →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All News button with arrows */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <Link
              href={content.ctaHref}
              className="inline-flex h-[65px] w-[152px] items-center justify-center rounded-full border border-white text-[12px] font-semibold text-white transition-all hover:bg-white hover:text-black"
            >
              {content.ctaText}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
