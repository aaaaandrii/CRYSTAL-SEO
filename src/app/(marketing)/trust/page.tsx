import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description:
    'Swiss-made, space-proven. Learn about our security measures, certifications, and manufacturing process.',
  alternates: {
    canonical: `${SITE_URL}/trust`,
  },
};

const certifications = [
  {
    name: 'ISO 27001',
    description:
      'Information security management system certification ensuring rigorous data protection controls.',
  },
  {
    name: 'ISO 9001',
    description:
      'Quality management system certification guaranteeing consistent manufacturing excellence.',
  },
  {
    name: 'Swiss Made',
    description:
      'All crystals are manufactured in Switzerland under the strictest quality and privacy laws in the world.',
  },
  {
    name: 'GDPR Compliant',
    description:
      'Full compliance with the European General Data Protection Regulation for handling client data.',
  },
];

const securityMeasures = [
  {
    title: 'Air-Gapped Encoding',
    description:
      'Our encoding systems are completely isolated from external networks. No internet connection touches the machines that write your data, eliminating the risk of remote intrusion.',
  },
  {
    title: 'Encrypted Data Transfer',
    description:
      'All data submitted for encoding is transferred via end-to-end encryption. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit.',
  },
  {
    title: 'Secure Destruction',
    description:
      'After successful encoding and verification, all source files and temporary copies are securely destroyed from our systems using certified data wiping protocols.',
  },
  {
    title: 'Cleanroom Manufacturing',
    description:
      'Crystals are encoded in a Class-100 cleanroom environment with strict access controls, environmental monitoring, and contamination prevention.',
  },
  {
    title: 'Tamper-Evident Packaging',
    description:
      'Every crystal ships in tamper-evident, security-sealed packaging with a unique serial number for authenticity verification.',
  },
  {
    title: 'Chain of Custody',
    description:
      'We maintain a complete chain-of-custody log from the moment your data arrives until your crystal is delivered, with full audit trail.',
  },
];

const partnerships = [
  {
    name: 'University of Southampton',
    description:
      'Foundational research partnership with the Optoelectronics Research Centre, where 5D optical storage was invented.',
  },
  {
    name: 'Arch Mission Foundation',
    description:
      'Collaboration to deploy 5D Memory Crystals on SpaceX missions as part of preserving human knowledge beyond Earth.',
  },
  {
    name: 'European Space Agency',
    description:
      'Working with ESA on data permanence solutions for long-duration space missions and deep-space probes.',
  },
];

export default function TrustPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
              Security &amp; Provenance
            </p>
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Trust &amp; Security
            </h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] font-semibold leading-none text-[#555]">
              Swiss-made, space-proven. Your data is handled with the highest
              security standards from transfer to delivery.
            </p>
          </div>
        </Container>
      </section>

      {/* Swiss Manufacturing */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <SectionHeading
            title="Swiss Manufacturing"
            description="Precision engineering under the world's strictest quality and data protection laws."
          />
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[22px] bg-[#e4e8ef] p-6 md:p-10">
              <p className="text-[14px] font-semibold leading-none text-[#555]">
                Every 5D Memory Crystal is manufactured in our dedicated
                facility in Switzerland. The Swiss legal framework provides some
                of the strongest data privacy protections in the world, and our
                facility operates under strict physical and digital security
                protocols. From raw fused quartz to finished crystal, the entire
                manufacturing chain takes place in one location, eliminating
                third-party handling risks.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[16px] bg-white p-5">
                  <h3 className="text-[17px] font-bold text-[#1a1a1a]">
                    Single-Site Production
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold leading-none text-[#555]">
                    All processes from encoding to packaging under one roof.
                  </p>
                </div>
                <div className="rounded-[16px] bg-white p-5">
                  <h3 className="text-[17px] font-bold text-[#1a1a1a]">
                    24/7 Surveillance
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold leading-none text-[#555]">
                    Round-the-clock monitoring with biometric access control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Security Measures */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <SectionHeading
            title="Security Measures"
            description="Multi-layered protection for your most valuable data."
          />
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {securityMeasures.map((measure) => (
                <article
                  key={measure.title}
                  className="rounded-[22px] bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-black/5"
                >
                  <h3 className="text-[17px] font-bold text-[#1a1a1a]">
                    {measure.title}
                  </h3>
                  <p className="mt-3 text-[14px] font-semibold leading-none text-[#555]">
                    {measure.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <SectionHeading
            title="Certifications"
            description="Independently verified standards of quality and security."
          />
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <article
                  key={cert.name}
                  className="rounded-[22px] bg-[#e4e8ef] p-6"
                >
                  <h3 className="text-[20px] font-bold text-[#5a72be]">
                    {cert.name}
                  </h3>
                  <p className="mt-2 text-[14px] font-semibold leading-none text-[#555]">
                    {cert.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Partnerships */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <SectionHeading
            title="Partnerships"
            description="Trusted by leading research institutions and space agencies."
            dark
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {partnerships.map((partner) => (
              <article
                key={partner.name}
                className="rounded-[22px] bg-[#1a1a1a] p-6 md:p-8"
              >
                <h3 className="text-[20px] font-bold text-white">
                  {partner.name}
                </h3>
                <p className="mt-3 text-[14px] font-semibold leading-none text-[#bbb]">
                  {partner.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/contact">Get in Touch</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
