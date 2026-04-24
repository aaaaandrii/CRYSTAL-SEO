import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import CaseStudiesGrid from './CaseStudiesGrid';
import CollectionsGallery from '../collections/CollectionsGallery';

const galleryItems = [
  {
    title: 'Universal Declaration of Human Rights',
    subtitle: 'UNESCO, 2016',
    tag: 'Cultural Heritage',
    image: '/collections/udhr.jpg',
  },
  {
    title: 'Holy Bible',
    subtitle: 'Biblioteca Apostolica Vaticana',
    tag: 'Cultural Heritage',
    image: '/case-studies/vatican.png',
  },
  {
    title: "Stephen Hawking's Brief History of Time",
    subtitle: 'V&A Museum, London',
    tag: 'Scientific',
    image: '/case-studies/brief-history-of-time.png',
  },
  {
    title: "Isaac Newton's Opticks",
    subtitle: 'Classical physics preserved',
    tag: 'Scientific',
    image: '/collections/newton-opticks.jpg',
  },
  {
    title: 'Isaac Asimov Collection',
    subtitle: 'Complete works encoded',
    tag: 'Art',
    image: '/case-studies/asimov-3.avif',
  },
  {
    title: 'Human Genome',
    subtitle: 'Complete DNA sequence, 2024',
    tag: 'DNA',
    image: '/case-studies/human-genome-collection.png',
  },
  {
    title: 'SpaceX Falcon Heavy Payload',
    subtitle: 'Tesla Roadster in space, 2018',
    tag: 'Scientific',
    image: '/collections/asimov-closeup.jpg',
  },
  {
    title: 'Moon Mars Museum',
    subtitle: 'Lunar archive of humanity',
    tag: 'Cultural Heritage',
    image: '/case-studies/moon-mars-museum.webp',
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    subtitle: 'Douglas Adams',
    tag: 'Art',
    image: '/case-studies/douglas-adams.png',
  },
];

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
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Case Studies
            </h1>
            <p className="mx-auto mt-4 max-w-[455px] text-[14px] font-semibold leading-none text-[#555]">
              Real-world stories of data preservation across industries.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="bg-[#e4e8ef] py-0 pb-20 md:pb-[88px]">
        <Container>
          <CaseStudiesGrid
            caseStudies={caseStudies.map((s) => ({
              id: s.id,
              slug: s.slug,
              client: s.client,
              excerpt: s.excerpt,
              imageUrl: s.imageUrl,
              imageAlt: s.imageAlt,
              sector: s.sector,
            }))}
          />
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                Featured Works
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
                Gallery
              </h2>
              <p className="mt-4 text-[14px] font-semibold leading-none text-[#555]">
                A curated selection of crystals produced for institutions,
                researchers, and private clients worldwide.
              </p>
            </div>
          </ScrollReveal>

          <CollectionsGallery items={galleryItems} />
        </Container>
      </section>
    </>
  );
}
