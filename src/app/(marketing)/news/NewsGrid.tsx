'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  tags: string;
  publishedAt: string | null;
}

const filterTags = ['All', 'Media', 'Research', 'Events', 'Partnerships'];

function getTagLabel(tags: string): string {
  const tag = tags.split(',')[0]?.trim().toLowerCase() ?? '';
  if (tag === 'media') return 'Media';
  if (tag === 'research') return 'Research';
  if (tag === 'events') return 'Events';
  if (tag === 'partnerships') return 'Partnerships';
  return 'News';
}

function getTagColor(tags: string): string {
  const tag = tags.split(',')[0]?.trim().toLowerCase() ?? '';
  if (tag === 'media') return 'bg-[#5a72be] text-white';
  if (tag === 'research') return 'bg-[#2a7d5f] text-white';
  if (tag === 'events') return 'bg-[#b35a2a] text-white';
  if (tag === 'partnerships') return 'bg-[#7a5ab3] text-white';
  return 'bg-[#888] text-white';
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function NewsGrid({ articles }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All'
      ? articles
      : articles.filter((article) => {
          const tag = article.tags.split(',')[0]?.trim().toLowerCase() ?? '';
          return tag === activeTag.toLowerCase();
        });

  return (
    <>
      {/* Filter Tags */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeTag === tag
                ? 'bg-[#5a72be] text-white'
                : 'bg-white text-[#555] hover:bg-[#d0d0d0]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="mt-16">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-[22px] bg-[#e4e8ef] transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${getTagColor(article.tags)}`}
                  >
                    {getTagLabel(article.tags)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {article.publishedAt && (
                    <p className="text-[13px] font-semibold text-[#888]">
                      {formatDate(article.publishedAt)}
                    </p>
                  )}
                  <h2 className="mt-2 text-[20px] font-bold leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] font-semibold leading-none text-[#555]">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#5a72be] transition-colors group-hover:text-[#4d63a8]">
                    Read More
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[14px] font-semibold text-[#555]">
              No articles found for this category.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
