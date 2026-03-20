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
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              {content.label}
            </p>
            <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
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
                    <p className="text-[14px] font-semibold uppercase leading-[14px] tracking-[1.12px] text-[#888]">
                      {formatDate(article.publishedAt)}
                    </p>
                  )}
                  <h3 className="text-[22px] font-bold leading-[22px] text-white transition-colors group-hover:text-[#5a72be]">
                    {article.title}
                  </h3>
                  <p className="line-clamp-4 text-[17px] font-semibold leading-[17px] text-[#bbb]">
                    {article.excerpt}
                  </p>
                  <span className="text-[14px] font-semibold uppercase leading-[14px] tracking-[1.4px] text-white transition-colors group-hover:text-[#5a72be]">
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
            <svg width="35" height="8" viewBox="0 0 35 8" fill="none" className="text-white">
              <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM35 3.5L1 3.5V4.5L35 4.5V3.5Z" fill="currentColor"/>
            </svg>
            <Link
              href={content.ctaHref}
              className="inline-flex h-[74px] w-[213px] items-center justify-center rounded-[52px] border border-white text-[12px] font-semibold uppercase text-white transition-all hover:bg-white hover:text-black"
            >
              {content.ctaText}
            </Link>
            <svg width="35" height="8" viewBox="0 0 35 8" fill="none" className="text-white">
              <path d="M34.3536 4.35355C34.5488 4.15829 34.5488 3.84171 34.3536 3.64645L31.1716 0.464466C30.9763 0.269204 30.6597 0.269204 30.4645 0.464466C30.2692 0.659728 30.2692 0.976311 30.4645 1.17157L33.2929 4L30.4645 6.82843C30.2692 7.02369 30.2692 7.34027 30.4645 7.53553C30.6597 7.7308 30.9763 7.7308 31.1716 7.53553L34.3536 4.35355ZM0 4.5H34V3.5H0V4.5Z" fill="currentColor"/>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
