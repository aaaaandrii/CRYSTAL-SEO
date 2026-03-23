'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string | null;
  sector: string;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CaseStudiesGrid({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const [activeSector, setActiveSector] = useState('All');

  // Derive unique sectors from actual data
  const sectors = [
    'All',
    ...Array.from(new Set(caseStudies.map((s) => s.sector))).sort(),
  ];

  const filtered =
    activeSector === 'All'
      ? caseStudies
      : caseStudies.filter((s) => s.sector === activeSector);

  return (
    <>
      {/* Sector Filter Tags */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setActiveSector(sector)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeSector === sector
                ? 'bg-[#5a72be] text-white'
                : 'bg-white text-[#555] hover:bg-[#d0d0d0]'
            }`}
          >
            {sector === 'All' ? 'All' : capitalize(sector)}
          </button>
        ))}
      </div>

      {/* Case Studies Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col gap-[13px] rounded-[40px] bg-white px-5 pb-[30px] pt-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="relative h-[282px] overflow-hidden rounded-[22px]">
                <Image
                  src={study.imageUrl}
                  alt={study.imageAlt || study.client}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="text-xs font-semibold uppercase text-[#1a1a1a]/50">
                {capitalize(study.sector)}
              </p>
              <h2 className="text-[31px] font-semibold leading-[31px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                {study.client}
              </h2>
              <p className="line-clamp-3 text-[14px] font-semibold leading-none text-[#555]">
                {study.excerpt}
              </p>
              <span className="text-[8px] font-semibold uppercase leading-[16px] text-[#1a1a1a] transition-colors group-hover:text-[#5a72be]">
                Case Study →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-[14px] font-semibold text-[#555]">
            No case studies found for this sector.
          </p>
        </div>
      )}
    </>
  );
}
