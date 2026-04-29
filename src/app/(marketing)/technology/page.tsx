import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Data is stored using femtosecond laser pulses into fused quartz glass, creating nanoscale structures that store information across five dimensions.',
  alternates: {
    canonical: `${SITE_URL}/technology`,
  },
};

const stats = [
  { value: '13B+', unit: 'Years', label: 'Data Lifespan' },
  { value: '360', unit: 'TB', label: 'Potential Per Disc Capacity' },
  { value: '1,000°C', unit: '', label: 'Heat Resistance' },
  { value: '$0', unit: '', label: 'Running Storage Costs' },
];

const contentSections = [
  {
    id: 'science',
    eyebrow: 'Core Technology',
    title: 'The Five Dimensions',
    description:
      '5D optical data storage uses a FemtoEtch™ process to store information across five dimensions within the structure of fused quartz glass. Three spatial dimensions (x, y, z layering) define the physical position of each data point within the crystal. Two additional optical dimensions are derived from birefringence — the slow axis orientation and retardance strength of self-assembled nanogratings — enabling vastly greater data density and permanence.',
    image: '/technology/5d-storage.png',
    imageAlt: '5D encoding diagram showing five dimensions of data storage',
    bullets: null,
  },
  {
    id: 'research',
    eyebrow: 'Writing Process',
    title: 'How Data is Written',
    description:
      'A femtosecond laser creates self-assembled nanogratings within fused silica glass. Each pit is less than 200nm in size and stores 8 bits (one byte) of data. The ultrashort laser pulses modify the glass at the nanoscale without cracking or damaging the surrounding material, enabling precise, high-density inscription.',
    image: '/technology/how-data-is-written.JPG',
    imageAlt: 'Femtosecond laser writing process creating nanogratings in quartz glass',
    bullets: [
      'Femtosecond laser inscription',
      'Sub-200nm nanogratings',
      'Self-assembled nanostructures',
      'Data erasable and rewritable',
    ],
  },
  {
    id: 'environment',
    eyebrow: 'Sustainability',
    title: 'Environmental Sustainability',
    description:
      "Global data centres consume 1.5–3% of the world's electricity and generate significant carbon emissions. 5D Memory Crystal™ storage requires zero ongoing energy once data has been written. Write once, store forever — with no cooling infrastructure, no hardware refresh cycles, and no recurring energy cost. A fundamentally more sustainable approach to long-term data preservation.",
    image: '/technology/enviromental.png',
    imageAlt: 'Sustainable data storage with zero energy maintenance',
    bullets: [
      'Zero energy maintenance',
      'No cooling infrastructure required',
      'No hardware refresh cycles',
      'Reduced carbon footprint vs cloud',
    ],
  },
  {
    id: 'resilience',
    eyebrow: 'Durability',
    title: 'Harsh Environment Resistance',
    description:
      '5D Memory Crystal™ survives conditions that destroy conventional storage. The fused quartz substrate is unaffected by ionizing radiation and electromagnetic pulses (EMPs), making it viable for space, near reactor sites, or in the aftermath of grid-scale disruptions. It is chemically inert with a zero water absorption rate, so crystals remain intact in high-humidity environments and can even be stored at the bottom of the ocean without data loss.',
    image: '/technology/harsh-environment.webp',
    imageAlt: 'Crystal storage resistant to radiation, EMPs, humidity, and deep ocean exposure',
    bullets: [
      'Radiation- and EMP-resistant',
      'Survives deep-ocean pressure and exposure',
      'Zero water absorption, fully humidity-resistant',
      'Chemically inert fused quartz substrate',
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
            <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
              Technology
            </p>
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              How 5D Optical Storage Works
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-[14px] font-semibold leading-none text-[#555]">
              Data is stored using femtosecond laser pulses into fused quartz
              glass, creating nanoscale structures that store information across
              five dimensions. Founded on 30+ years of pioneering research at
              the University of Southampton.
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-[22px] bg-white p-6 text-center"
              >
                <p className="text-[32px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] sm:text-[38px] sm:tracking-[-1px] lg:text-[42px]">
                  {stat.value}
                  {stat.unit && <> {stat.unit}</>}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase text-[#888]">
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
                  <div className="relative aspect-square w-full overflow-hidden rounded-[22px]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal
                  direction={isEven ? 'right' : 'left'}
                  className="w-full flex-1"
                >
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                      {section.eyebrow}
                    </p>
                    <h2 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
                      {section.title}
                    </h2>
                    <p className="mt-4 max-w-[480px] text-[14px] font-semibold leading-none text-[#555]">
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
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                Get Started
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
                Your First Crystal
              </h2>
              <p className="mt-4 text-[14px] font-semibold leading-none text-[#bbb]">
                Available now for early adopters. Choose a format, upload your
                files, and receive a crystal that will outlast everything you
                own.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
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
