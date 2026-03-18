import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Data is encoded using femtosecond laser pulses into fused quartz glass, creating nanoscale structures that store information across five dimensions.',
  alternates: {
    canonical: `${SITE_URL}/technology`,
  },
};

const stats = [
  { value: '13.8B', unit: 'Years', label: 'Data Lifespan' },
  { value: '360', unit: 'TB', label: 'Per Disc Capacity' },
  { value: '1,000°C', unit: '', label: 'Heat Resistance' },
  { value: '30+', unit: '', label: 'Years of R&D' },
];

const contentSections = [
  {
    id: 'science',
    eyebrow: 'Core Technology',
    title: 'The Five Dimensions',
    description:
      'Unlike conventional storage that records data in two dimensions, 5D optical storage encodes information across five separate dimensions within fused quartz glass. Three spatial dimensions (x, y, z layering) define the physical position of each data point within the crystal. Two additional optical dimensions are derived from birefringence — the slow axis orientation and retardance strength of self-assembled nanogratings — enabling vastly greater data density and permanence.',
    image: '/images/swiss-facility.png',
    imageAlt: '5D encoding diagram showing five dimensions of data storage',
    bullets: null,
  },
  {
    id: 'research',
    eyebrow: 'Writing Process',
    title: 'How Data is Written',
    description:
      'A femtosecond laser creates self-assembled nanogratings within fused silica glass. Each pit is less than 200nm in size and stores 8 bits (one byte) of data. The ultrashort laser pulses modify the glass at the nanoscale without cracking or damaging the surrounding material, enabling precise, high-density inscription.',
    image: '/sectors/ip.png',
    imageAlt: 'Femtosecond laser writing process creating nanogratings in quartz glass',
    bullets: [
      'Femtosecond laser inscription',
      'Sub-200nm nanogratings',
      'Self-assembled nanostructures',
      'Data erasable and rewritable',
    ],
  },
  {
    id: 'dna',
    eyebrow: 'Genomics',
    title: 'DNA & Genomic Storage',
    description:
      'Entire human genomes can be encoded into a single crystal, preserving the biological blueprint of life for billions of years. In partnership with LifeShip, biological data sets are inscribed into fused quartz glass — making permanent what was once perishable. From medical research archives to personal genome records, crystal storage ensures that critical biological data endures far beyond the limits of conventional media.',
    image: '/sectors/dna.png',
    imageAlt: 'DNA data encoded into a 5D Memory Crystal',
    bullets: [
      'Complete human genome storage',
      'Biological dataset archival',
      'Billion-year preservation guarantee',
      'Partnership with LifeShip',
    ],
  },
  {
    id: 'environment',
    eyebrow: 'Sustainability',
    title: 'Environmental Sustainability',
    description:
      'Global data centres consume 1–2% of the world\'s electricity and generate significant carbon emissions. 5D crystal storage requires zero ongoing energy once data has been written. Write once, store forever — with no cooling infrastructure, no hardware refresh cycles, and no recurring energy cost. A fundamentally more sustainable approach to long-term data preservation.',
    image: '/sectors/corporate.png',
    imageAlt: 'Sustainable data storage with zero energy maintenance',
    bullets: [
      'Zero energy maintenance',
      'No cooling infrastructure required',
      'No hardware refresh cycles',
      'Reduced carbon footprint vs cloud',
    ],
  },
  {
    id: 'luxury-crypto',
    eyebrow: 'Premium Applications',
    title: 'Luxury, Jewellery & Crypto',
    description:
      'Beyond archival, 5D crystal functions as a luxury object in its own right. Bespoke data jewellery encodes personal meaning into wearable, permanent form. For the crypto community, crystal offers the ultimate cold storage — seed phrases and wallet keys inscribed into glass that is offline, unhackable, and indestructible. Commemorative and collectible pieces combine artistry with embedded authentication data.',
    image: '/sectors/luxury.png',
    imageAlt: 'Luxury crystal jewellery and crypto cold storage solutions',
    bullets: [
      'Bespoke crystal jewellery',
      'Crypto cold storage (seed phrases, keys)',
      'Commemorative luxury pieces',
      'Embedded authentication data',
    ],
  },
];

export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Technology
            </p>
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              How 5D Optical Storage Works
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-[17px] font-semibold leading-[22px] text-[#555]">
              Data is encoded using femtosecond laser pulses into fused quartz
              glass, creating nanoscale structures that store information across
              five dimensions. Founded on 30+ years of pioneering research at
              the University of Southampton.
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[22px] bg-white p-6 text-center"
              >
                <p className="text-[36px] font-bold leading-none tracking-[-1px] text-[#1a1a1a] md:text-[42px]">
                  {stat.value}
                  {stat.unit && (
                    <span className="ml-1 text-[18px] font-semibold text-[#5a72be] md:text-[20px]">
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Content Sections — alternating layout */}
      {contentSections.map((section, index) => {
        const isEven = index % 2 === 0;
        const bgColor = isEven ? 'bg-white' : 'bg-[#e4e8ef]';

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${bgColor} py-20 md:py-[88px]`}
          >
            <Container>
              <div
                className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-[80px] ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <ScrollReveal
                  direction={isEven ? 'left' : 'right'}
                  className="w-full flex-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal
                  direction={isEven ? 'right' : 'left'}
                  className="w-full flex-1"
                >
                  <div>
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                      {section.eyebrow}
                    </p>
                    <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                      {section.title}
                    </h2>
                    <p className="mt-4 max-w-[480px] text-[17px] font-semibold leading-[22px] text-[#555]">
                      {section.description}
                    </p>

                    {section.bullets && (
                      <ul className="mt-6 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-[15px] font-semibold text-[#1a1a1a]"
                          >
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5a72be]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </Container>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Get Started
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
                Your First Crystal
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#bbb]">
                Available now for early adopters. Choose a format, upload your
                files, and receive a crystal that will outlast everything you
                own.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/order" size="lg">
                  Order Your Crystal
                </Button>
                <Button href="/collections" variant="outline" size="lg">
                  See Collections
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
