import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Trust & Process',
  description:
    'From the moment you hand over your data to the moment you read it back — every step is designed for security, transparency, and confidence.',
  alternates: {
    canonical: `${SITE_URL}/process`,
  },
};

const pillars = [
  {
    number: 1,
    title: 'Secure Transfer',
    summary: 'Encrypted upload or air-gapped physical handover.',
  },
  {
    number: 2,
    title: 'Certificate',
    summary: 'Formal proof of exactly what data is in your crystal.',
  },
  {
    number: 3,
    title: 'Verification',
    summary: 'Bit-for-bit integrity check after encoding.',
  },
  {
    number: 4,
    title: 'Read Service',
    summary: 'On-demand data retrieval from your crystal.',
  },
];

const steps = [
  {
    step: 1,
    id: 'secure-transfer',
    title: 'Secure Data Transfer',
    description:
      'Your data is the most valuable thing you\'ll entrust to us — so we treat the transfer with the same level of security as the crystal itself. Whether you upload through our encrypted portal or ship physical media directly, your files are handled in an air-gapped environment from the moment they arrive.',
    bullets: [
      'End-to-end encrypted file upload portal',
      'Physical media shipping option for sensitive data',
      'Air-gapped receiving environment — no internet exposure',
      'Data securely erased from all transfer media after encoding',
    ],
    image: '/process/data-transfer.JPG.webp',
    imageAlt: 'Encrypted upload and secure data transfer process',
  },
  {
    step: 2,
    id: 'certificate',
    title: 'Certificate of Authority',
    description:
      'Every crystal comes with a formal Certificate of Authority — a documented record of exactly what data has been encoded, when it was written, and by whom. This is your proof of provenance: an auditable, tamper-evident record that travels with the crystal for its entire lifespan.',
    bullets: [
      'Itemised manifest of all encoded files and data sets',
      'Timestamped encoding record with unique crystal identifier',
      'Cryptographic hash of the source data for independent verification',
      'Physical and digital certificate formats available',
    ],
    image: '/process/certificate.JPG',
    imageAlt: 'Certificate of Authority document for 5D Memory Crystal',
  },
  {
    step: 3,
    id: 'verification',
    title: 'Data Verification',
    description:
      'After encoding, the crystal is immediately read back and the retrieved data is compared against the original — bit for bit. This verification step confirms that the data stored in the crystal is complete, accurate, and exactly as it should be. Nothing is shipped until verification passes.',
    bullets: [
      'Full read-back after every encoding session',
      'Bit-for-bit comparison against source data',
      'Verification report included with your Certificate of Authority',
      'Failed verifications trigger automatic re-encoding',
    ],
    image: '/process/data-verification.jpg.webp',
    imageAlt: 'Data verification and quality check process',
  },
  {
    step: 4,
    id: 'read-service',
    title: 'Read Service',
    description:
      'Your data is encoded for eternity — but you may need to access it today. Our read service uses precision optical equipment to retrieve the data stored in your crystal and deliver it back to you in any standard digital format. Available on demand, as many times as you need.',
    bullets: [
      'On-demand data retrieval from any 5D Memory Crystal',
      'Output delivered in standard digital formats',
      'Secure return shipping and handling',
      'Future-proofed — visual decoding instructions encoded on the crystal itself',
    ],
    image: '/process/reading-device.JPG.webp',
    imageAlt: 'Crystal reader and optical data retrieval equipment',
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
              Trust &amp; Process
            </p>
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Trust &amp; Process
            </h1>
            <p className="mx-auto mt-4 max-w-[580px] text-[17px] font-semibold leading-[22px] text-[#555]">
              From the moment you hand over your data to the moment you read it
              back — every step is designed for security, transparency, and
              confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* Four Pillars Overview */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                The Process
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                Four Pillars of Trust
              </h2>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
                Each crystal goes through a rigorous, auditable process — so you
                never have to wonder.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <ScrollReveal key={pillar.number}>
                <a
                  href={`#${steps[pillar.number - 1].id}`}
                  className="group flex h-full flex-col rounded-[22px] bg-[#e4e8ef] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5a72be]">
                    <span className="text-[20px] font-bold text-white">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[20px] font-bold text-[#1a1a1a]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] font-semibold leading-[20px] text-[#555]">
                    {pillar.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#5a72be] transition-colors group-hover:text-[#4d63a8]">
                    Learn more
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
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Step Detail Sections — alternating layout */}
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        const bgColor = isEven ? 'bg-[#e4e8ef]' : 'bg-white';

        return (
          <section
            key={step.id}
            id={step.id}
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
                      src={step.image}
                      alt={step.imageAlt}
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
                    <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5a72be]">
                      Step {step.step}
                    </p>
                    <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
                      {step.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {step.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-[15px] font-semibold text-[#1a1a1a]"
                        >
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5a72be]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Continuous Improvement */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                Looking Ahead
              </p>
              <h2 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[42px]">
                Continuous Improvement
              </h2>
              <h3 className="mt-3 text-[20px] font-bold text-[#5a72be]">
                More Trust Services Coming
              </h3>
              <p className="mt-4 text-[17px] font-semibold leading-[22px] text-[#555]">
                We are continuously developing new services to increase your
                confidence in our process and product — from expanded
                verification options to long-term custodial services. This page
                will grow as we do.
              </p>
            </div>
          </ScrollReveal>
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
                Get in touch to discuss your requirements or schedule a demo of
                our secure encoding process.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/schedule-demo" size="lg">
                  Schedule Demo
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
