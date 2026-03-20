import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the team behind 5D Memory Crystal — over 30 years of pioneering research in ultra-long-life data storage, now commercially available from Switzerland.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const milestones = [
  {
    year: '1999',
    title: 'Research Begins',
    description:
      'Prof. Peter Kazansky begins pioneering research into femtosecond laser nanostructuring of fused quartz at the University of Southampton.',
  },
  {
    year: '2013',
    title: 'Guinness World Record',
    description:
      'The 5D optical storage method achieves the Guinness World Record for the most durable digital storage medium.',
  },
  {
    year: '2016',
    title: 'Cultural Firsts',
    description:
      'The Magna Carta and Universal Declaration of Human Rights are encoded into 5D Memory Crystal for permanent preservation.',
  },
  {
    year: '2018',
    title: 'Into Space',
    description:
      'A 5D Memory Crystal is launched aboard the SpaceX Falcon Heavy, becoming the first permanent data storage in orbit.',
  },
  {
    year: '2024',
    title: 'Human Genome Preserved',
    description:
      'The complete human genome is encoded into a single 5D Memory Crystal, a landmark in biological data preservation.',
  },
  {
    year: '2025',
    title: 'Commercially Available',
    description:
      '5D Memory Crystal becomes commercially available for early adopters — organisations and individuals seeking eternal data preservation.',
  },
];

const values = [
  {
    title: 'Permanence',
    description:
      'We build for timescales measured in billions of years. Every decision — from material selection to encoding method — is optimised for absolute longevity.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    ),
  },
  {
    title: 'Security',
    description:
      'Your data is handled in air-gapped Swiss facilities with full chain of custody. No third-party access, no internet exposure, tamper-evident delivery.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
  },
  {
    title: 'Precision',
    description:
      'Femtosecond laser pulses write data at the nanoscale with bit-for-bit verification. Swiss-made engineering ensures consistent quality across every crystal.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    description:
      'Once written, a 5D Crystal requires zero energy to maintain. No cooling, no migration, no cloud infrastructure — the greenest archival medium in existence.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
      </svg>
    ),
  },
];

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '5D Memory Crystal',
  alternateName: 'SPhotonix',
  url: SITE_URL,
  description:
    'Pioneering ultra-long-life data storage through 5D optical technology. Swiss-made, space-proven eternal storage in pure quartz glass.',
  foundingDate: '1999',
  founder: {
    '@type': 'Person',
    name: 'Prof. Peter Kazansky',
    jobTitle: 'Founder & Chief Scientist',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />

      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
              About Us
            </p>
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Preserving What Matters
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-[14px] font-semibold leading-none text-[#555]">
              Over 30 years of pioneering research, one mission — make
              ultra-long-life data storage commercially available to the world.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission / Story */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-[80px]">
            <ScrollReveal direction="left" className="w-full flex-1">
              <div className="relative h-[360px] w-full overflow-hidden rounded-[50px] lg:h-[480px]">
                <Image
                  src="/images/swiss-facility.png"
                  alt="5D Memory Crystal Swiss manufacturing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="w-full flex-1">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                  Our Story
                </p>
                <h2 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
                  From Lab to Legacy
                </h2>
                <p className="mt-5 text-[14px] font-semibold leading-none text-[#555]">
                  5D Memory Crystal technology was pioneered by Prof. Peter
                  Kazansky, a world-leading scientist whose decades of research
                  at the University of Southampton transformed our understanding
                  of light–matter interaction at the nanoscale.
                </p>
                <p className="mt-4 text-[14px] font-semibold leading-none text-[#555]">
                  Today, led by technology entrepreneur Ilya Kazansky, our team
                  of scientists, engineers and product specialists combines
                  optical nano-technology with advances in machine learning and
                  AI to deliver the most durable storage medium ever created —
                  manufactured in Switzerland to the highest standards.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                What Drives Us
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="flex h-full flex-col rounded-[22px] bg-white p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
                  <div className="mb-4 text-[#5a72be]">{value.icon}</div>
                  <h3 className="text-[20px] font-bold text-[#1a1a1a]">
                    {value.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] font-semibold leading-none text-[#555]">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                Our Journey
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
                Key Milestones
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-3xl">
            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 0.08}>
                <div className="flex gap-6 border-b border-white/10 py-8 first:pt-0 last:border-b-0 sm:gap-10">
                  <div className="shrink-0">
                    <span className="text-[32px] font-bold leading-none tracking-[-0.02em] text-[#5a72be] sm:text-[40px]">
                      {milestone.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-white">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-[14px] font-semibold leading-none text-[#bbb]">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { stat: '30+', label: 'Years of Research' },
                { stat: '360 TB', label: 'Max Capacity per Crystal' },
                { stat: '13.8B', label: 'Years Lifespan' },
                { stat: '1,000\u00B0C', label: 'Heat Resistance' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] bg-white p-8 text-center"
                >
                  <p className="text-[40px] font-bold leading-none tracking-[-1px] text-[#5a72be] lg:text-[48px]">
                    {item.stat}
                  </p>
                  <p className="mt-3 text-[15px] font-semibold text-[#555]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                Get Started
              </p>
              <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
                Preserve What Matters Most
              </h2>
              <p className="mt-4 text-[14px] font-semibold leading-none text-[#bbb]">
                Whether you&apos;re an institution, a researcher, or an
                individual — we&apos;re here to help you store your most
                valuable data for eternity.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/schedule-demo" size="lg">
                  Schedule a Demo
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
