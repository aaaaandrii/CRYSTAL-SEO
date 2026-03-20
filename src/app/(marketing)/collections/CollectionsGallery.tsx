'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
}

const allTags = [
  'All',
  'Cultural Heritage',
  'Scientific',
  'Personal',
  'Art',
  'DNA',
  'Luxury',
];

export default function CollectionsGallery({
  items,
}: {
  items: GalleryItem[];
}) {
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All'
      ? items
      : items.filter((item) => item.tag === activeTag);

  return (
    <>
      {/* Filter Tags */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeTag === tag
                ? 'bg-[#5a72be] text-white'
                : 'bg-[#e4e8ef] text-[#555] hover:bg-[#d0d0d0]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[22px] bg-[#e4e8ef] transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5a72be] backdrop-blur-sm">
                {item.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-[17px] font-bold leading-tight text-[#1a1a1a]">
                {item.title}
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-[#888]">
                {item.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[14px] font-semibold text-[#888]">
          No items found for this category.
        </p>
      )}
    </>
  );
}
