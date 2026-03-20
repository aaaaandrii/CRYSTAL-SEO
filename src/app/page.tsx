import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import TrustedByBar from '@/components/sections/TrustedByBar';
import RecognitionBar from '@/components/sections/RecognitionBar';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import SaveDataSection from '@/components/sections/SaveDataSection';
import SectorsSection from '@/components/sections/SectorsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import SwissMadeSection from '@/components/sections/SwissMadeSection';
import SpaceProvenSection from '@/components/sections/SpaceProvenSection';
import NewsSection from '@/components/sections/NewsSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import CTASection from '@/components/sections/CTASection';
import { getPageContent, getContentItems } from '@/lib/content';

export default async function HomePage() {
  // Fetch content for client components (server components fetch their own)
  const [heroContent, recognitionContent, mediaQuotes, saveDataContent] = await Promise.all([
    getPageContent('home', 'hero', {}),
    getPageContent('home', 'recognition', {}),
    getContentItems<{ quote: string; source: string }>('media-quote', []),
    getPageContent('home', 'save-data', {}),
  ]);

  return (
    <>
      <HeroSection content={heroContent} />
      <TrustedByBar />
      <RecognitionBar content={recognitionContent} quotes={mediaQuotes} />
      <BenefitsSection />
      <ComparisonSection />
      <SaveDataSection content={saveDataContent} />
      <SectorsSection />
      <ProcessSection />
      <SwissMadeSection />
      <SpaceProvenSection />
      <Suspense fallback={<CaseStudiesSkeleton />}>
        <CaseStudiesSection />
      </Suspense>
      <Suspense fallback={<NewsSkeleton />}>
        <NewsSection />
      </Suspense>
      <CTASection />
    </>
  );
}

function NewsSkeleton() {
  return (
    <section className="bg-black py-20 md:py-[88px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        <div className="mb-10">
          <div className="mb-3 h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="h-10 w-64 animate-pulse rounded bg-white/10" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[22px] bg-[#1a1a1a]">
              <div className="h-[200px] animate-pulse bg-white/5" />
              <div className="flex flex-col gap-[10px] p-6">
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                <div className="h-6 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSkeleton() {
  return (
    <section className="bg-brand-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="mb-4 h-12 w-72 animate-pulse rounded bg-brand-light" />
          <div className="h-6 w-96 animate-pulse rounded bg-brand-light" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[40px] bg-white px-5 pb-[30px] pt-5">
              <div className="mb-3 h-[282px] animate-pulse rounded-[22px] bg-brand-light" />
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-brand-light" />
              <div className="mb-2 h-8 w-32 animate-pulse rounded bg-brand-light" />
              <div className="h-4 w-full animate-pulse rounded bg-brand-light" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
