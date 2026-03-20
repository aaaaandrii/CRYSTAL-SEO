import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'From personal keepsakes to enterprise-grade archival, luxury goods, and blockchain verification — every service built on the same indestructible foundation.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

/* ── Detailed service data ──────────────────────────────────────────── */

const services = [
  {
    slug: 'space-tech',
    eyebrow: 'Space Tech',
    title: 'Built for the Final Frontier',
    description:
      'The 5D Memory Crystal is engineered to withstand the vacuum, intense radiation, and extreme temperature extremes of space without degradation. Whether aboard satellites, deep-space probes, or lunar installations, crystal storage ensures mission-critical data survives where no conventional medium can.',
    image: '/sectors/Space.png',
    imageAlt: 'Space technology grade crystal data storage',
    bullets: [
      'Radiation-resistant and vacuum-stable',
      'Survives extreme temperature swings',
      'Ideal for satellites and deep-space missions',
      'No power required for data retention',
    ],
  },
  {
    slug: 'corporate',
    eyebrow: 'Corporate & Legal',
    title: 'Immutable Business Records',
    description:
      'Regulatory archives, board resolutions, IP filings, and compliance records that must remain unalterable and retrievable indefinitely. Crystal storage meets the most demanding data retention policies — providing tamper-proof, offline records that satisfy auditors and regulators without ongoing infrastructure cost.',
    image: '/sectors/corporate.png',
    imageAlt: 'Corporate data archival and legal compliance records',
    bullets: [
      'Regulatory and compliance archival',
      'Tamper-proof audit trail',
      'Zero ongoing infrastructure cost',
      'Air-gapped — immune to cyber attacks',
    ],
  },
  {
    slug: 'ip',
    eyebrow: 'IP Protection',
    title: 'Proof That Can\'t Be Altered',
    description:
      'Timestamped, tamper-proof records of intellectual property — patents, trade secrets, source code, and creative works sealed in glass. Crystal provides irrefutable proof of existence at a specific point in time, creating a permanent record that stands up in any jurisdiction and cannot be backdated, altered, or destroyed.',
    image: '/sectors/ip.png',
    imageAlt: 'Intellectual property protection and timestamping',
    bullets: [
      'Tamper-proof timestamp of creation',
      'Patents, trade secrets, and source code',
      'Admissible as evidence in legal proceedings',
      'Cannot be backdated or altered',
    ],
  },
  {
    slug: 'dna',
    eyebrow: 'DNA & Genomics',
    title: 'The Blueprint of Life, Preserved',
    description:
      'Encode entire human genomes and biological data sets into crystal — preserving the blueprint of life for billions of years. In partnership with LifeShip, we offer a permanent record of your genetic identity. From personal genome preservation to large-scale research archives, crystal ensures biological data outlasts every conventional storage medium.',
    image: '/sectors/dna.png',
    imageAlt: 'DNA and genomic data encoded into 5D memory crystal',
    bullets: [
      'Complete human genome storage',
      'Research dataset archival',
      'Partnership with LifeShip',
      'Billion-year data integrity guarantee',
    ],
  },
  {
    slug: 'cultural',
    eyebrow: 'Cultural Heritage',
    title: 'Preserving Civilisation',
    description:
      'Partner with museums, libraries, national archives, and UNESCO sites to preserve humanity\'s most irreplaceable documents and artworks. From the Magna Carta to the Universal Declaration of Human Rights, we\'ve encoded some of the world\'s most significant cultural artefacts into 5D crystal — ensuring they survive for billions of years.',
    image: '/sectors/cultural.png',
    imageAlt: 'Cultural heritage preservation with 5D crystal technology',
    bullets: [
      'UNESCO and national archive partnerships',
      'Magna Carta and UDHR already encoded',
      'Museum-grade presentation cases',
      'Full provenance and Certificate of Authority',
    ],
  },
  {
    slug: 'luxury',
    eyebrow: 'Luxury & Jewellery',
    title: 'Data as a Luxury Object',
    description:
      'Crystal as a luxury object in its own right — bespoke data jewellery that encodes personal meaning into wearable, permanent form. Commemorative and collectible pieces combine artistry with embedded data, creating unique objects that tell a story visible only under specialised readers. Ideal for high-net-worth individuals, luxury brands, and special occasions.',
    image: '/sectors/luxury.png',
    imageAlt: 'Luxury crystal jewellery with encoded data',
    bullets: [
      'Bespoke crystal jewellery and pendants',
      'Luxury brand collaboration pieces',
      'Commemorative and limited editions',
      'Embedded authentication data',
    ],
  },
  {
    slug: 'crypto',
    eyebrow: 'Crypto & Blockchain',
    title: 'The Ultimate Cold Storage',
    description:
      'Seed phrases, wallet keys, and smart contract records inscribed into glass that is offline, unhackable, and indestructible. No battery, no firmware, no single point of failure. For the crypto community, crystal offers cold storage that genuinely cannot be compromised — immune to fire, flood, EMP, and the passage of time.',
    image: '/sectors/crypto.png',
    imageAlt: 'Cryptocurrency cold storage in 5D crystal',
    bullets: [
      'Seed phrase and private key inscription',
      'Immune to fire, flood, and EMP',
      'No battery or firmware dependency',
      'Tamper-evident delivery and packaging',
    ],
  },
  {
    slug: 'personal',
    eyebrow: 'Personal & Family',
    title: 'Memories That Last Forever',
    description:
      'Family photos, wedding videos, letters, and personal milestones encoded into a crystal keepsake — a permanent gift that outlasts every hard drive, cloud account, and social media platform. Whether it\'s a first birthday or a lifetime archive, your memories are preserved beyond the reach of data loss, format obsolescence, or digital decay.',
    image: '/sectors/personal.png',
    imageAlt: 'Personal family memories preserved in 5D crystal',
    bullets: [
      'Photos, videos, documents, and audio files',
      'Presentation case included as standard',
      'Perfect as a gift or heirloom',
      'No subscription or maintenance required',
    ],
  },
];

const problems = [
  {
    title: 'Data Loss',
    description:
      'Hard drives fail. Cloud providers shut down. 5D crystal removes the risk of losing irreplaceable digital assets forever.',
    icon: '/icons/no-data-loss.svg',
  },
  {
    title: 'Loss of Access',
    description:
      'Format obsolescence, account lockouts, service discontinuation — crystal data is readable with basic optics, no subscription needed.',
    icon: '/icons/no-access-loss.svg',
  },
  {
    title: 'Legal & Compliance',
    description:
      'Regulatory mandates require immutable, long-term records. Crystal provides tamper-proof storage that satisfies the strictest policies.',
    icon: '/icons/legal-compliance-ready.svg',
  },
  {
    title: 'Cyber Security',
    description:
      'Fully air-gapped, offline, and immune to ransomware. No network connection means zero attack surface.',
    icon: '/icons/cyber-security.svg',
  },
  {
    title: 'Environmental Performance',
    description:
      'Data centres consume 1–2% of global electricity. Crystal requires zero energy to maintain — write once, store forever.',
    icon: '/icons/environmental-performance.svg',
  },
  {
    title: 'Backup & Redundancy',
    description:
      'The ultimate last line of defence. Crystal backup survives fires, floods, and EMP that would destroy any conventional copy.',
    icon: '/icons/Ultimate Backup.svg',
  },
];

const processSteps = [
  {
    number: 1,
    title: 'Choose Your Format',
    description:
      'Select crystal size and storage capacity based on your needs.',
  },
  {
    number: 2,
    title: 'Upload Your Data',
    description:
      'Securely transfer files through our encrypted upload portal.',
  },
  {
    number: 3,
    title: 'We Encode',
    description:
      'Femtosecond laser writes your data into fused quartz glass.',
  },
  {
    number: 4,
    title: 'Receive Your Crystal',
    description:
      'Your permanent archive, delivered in a presentation case.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Sectors
            </p>
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Storage Solutions for Every Need
            </h1>
            <p className="mx-auto mt-4 max-w-[580px] text-[17px] font-semibold leading-[22px] text-[#555]">
              From personal keepsakes to enterprise-grade archival, luxury
              goods, and blockchain verification — every service built on the
              same indestructible foundation.
            </p>
          </div>

          {/* Quick-nav cards */}
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`#${svc.slug}`}
                className="rounded-[16px] bg-white px-4 py-4 text-center transition-all hover:shadow-md hover:shadow-black/5"
              >
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {svc.eyebrow}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 8 Detailed Service Sections ── */}
      {services.map((svc, index) => {
        const isEven = index % 2 === 0;
        const bgColor = isEven ? 'bg-white' : 'bg-[#e4e8ef]';

        return (
          <section
            key={svc.slug}
            id={svc.slug}
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
                      src={svc.image}
                      alt={svc.imageAlt}
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
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                      {svc.eyebrow}
                    </p>
                    <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                      {svc.title}
                    </h2>
                    <p className="mt-4 max-w-[480px] text-[17px] font-semibold leading-[22px] text-[#555]">
                      {svc.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {svc.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-[15px] font-semibold text-[#1a1a1a]"
                        >
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5a72be]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button href="/contact" size="lg">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Problems We Solve */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Why Choose Us?
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
                The Problems We Solve
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#bbb]">
                Every reason organisations and individuals turn to permanent
                storage.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <ScrollReveal key={problem.title}>
                <article className="flex h-full flex-col rounded-[22px] bg-[#1a1a1a] p-6 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[12px] bg-white/10">
                    <Image
                      src={problem.icon}
                      alt={problem.title}
                      width={28}
                      height={28}
                      className="brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-[20px] font-bold text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] font-semibold leading-[20px] text-[#bbb]">
                    {problem.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Process
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                How It Works
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
                Four simple steps from upload to eternity.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <ScrollReveal key={step.number}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#5a72be]">
                    <span className="text-[24px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-[#1a1a1a]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] font-semibold leading-[20px] text-[#555]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Get Started
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-white lg:text-[42px]">
                Ready to Preserve Your Data?
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#bbb]">
                Choose your crystal format today and create a permanent record
                that will outlast every other storage medium on Earth.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Order Your Crystal
                </Button>
                <Button href="/schedule-demo" variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
