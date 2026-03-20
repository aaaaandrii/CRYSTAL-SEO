import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import CollectionsGallery from './CollectionsGallery';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'From the Magna Carta to complete human genomes — explore the works and data sets encoded into 5D Memory Crystal.',
  alternates: {
    canonical: `${SITE_URL}/collections`,
  },
};

const galleryItems = [
  {
    title: 'Magna Carta',
    subtitle: 'Salisbury Cathedral, 2016',
    tag: 'Cultural Heritage',
    image: '/collections/magna-carta.jpg',
  },
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
    image: '/collections/udhr-colour.jpg',
  },
  {
    title: "Stephen Hawking's Brief History of Time",
    subtitle: 'V&A Museum, London',
    tag: 'Scientific',
    image: '/collections/asimov-1.jpg',
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
    image: '/collections/asimov-2.jpg',
  },
  {
    title: 'Human Genome',
    subtitle: 'Complete DNA sequence, 2024',
    tag: 'DNA',
    image: '/collections/asimov-3.jpg',
  },
  {
    title: 'SpaceX Falcon Heavy Payload',
    subtitle: 'Tesla Roadster in space, 2018',
    tag: 'Scientific',
    image: '/collections/asimov-closeup.jpg',
  },
  {
    title: 'European Physical Society Milestones',
    subtitle: '50th anniversary, 2018',
    tag: 'Scientific',
    image: '/collections/asimov-detail.jpg',
  },
];

const categories = [
  {
    name: 'Personal Archives',
    slug: 'personal-archives',
    description:
      'Family photos, videos, letters, and memories encoded as permanent keepsakes.',
    image: '/collections/personal-archives.png',
  },
  {
    name: 'Eternal Art',
    slug: 'eternal-art',
    description:
      'Artworks, rare media, and creative works preserved beyond the life of any medium.',
    image: '/collections/eternal-art.png',
  },
  {
    name: 'Time Capsules',
    slug: 'time-capsules',
    description:
      'Messages and artefacts sealed for future generations to discover.',
    image: '/collections/time-capsules.png',
  },
  {
    name: 'Documents & Archives',
    slug: 'documents-archives',
    description:
      'Legal records, research data, and institutional archives made permanent.',
    image: '/collections/documents.png',
  },
  {
    name: 'DNA & Genomics',
    slug: 'dna-genomics',
    description:
      'Complete genomes and biological datasets preserved for billions of years.',
    image: '/collections/archives.png',
  },
  {
    name: 'Luxury & Commemorative',
    slug: 'luxury-commemorative',
    description:
      'Bespoke crystal jewellery and high-end collectibles with embedded data.',
    image: '/collections/printed-doc.png',
  },
];

const collectionsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Collections — 5D Memory Crystal',
  description:
    'From the Magna Carta to complete human genomes — explore the works and data sets encoded into 5D Memory Crystal.',
  url: `${SITE_URL}/collections`,
};

export default function CollectionsPage() {
  return (
    <>
      <JsonLd data={collectionsJsonLd} />

      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Collections
            </p>
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              What We&apos;ve Preserved
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[17px] font-semibold leading-[22px] text-[#555]">
              From the Magna Carta to complete human genomes — explore the works
              and data sets encoded into 5D Memory Crystal.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Featured Works
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                Gallery
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
                A curated selection of crystals produced for institutions,
                researchers, and private clients worldwide.
              </p>
            </div>
          </ScrollReveal>

          <CollectionsGallery items={galleryItems} />
        </Container>
      </section>

      {/* Categories */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Categories
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                Browse by Collection
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <ScrollReveal key={category.slug}>
                <Link
                  href={`/collections#${category.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[22px] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[20px] font-bold text-[#1a1a1a]">
                      {category.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] font-semibold leading-[20px] text-[#555]">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Commission CTA */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Custom Orders
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
                Commission a Custom Crystal
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#bbb]">
                Have something unique to preserve? Work with our team to encode
                your data into a bespoke 5D Memory Crystal.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Contact Us
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  See Pricing
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
