import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const steps = [
  {
    number: '1',
    title: 'Secure Data Transfer',
    description:
      'Your data is transferred via encrypted channels or air-gapped physical media — it never passes through unsecured networks.',
  },
  {
    number: '2',
    title: 'Certificate of Authority',
    description:
      'Every crystal ships with a formal certificate documenting exactly what data has been encoded — your proof of provenance.',
  },
  {
    number: '3',
    title: 'Data Verification',
    description:
      'After encoding, the crystal is read back and verified against the original data to confirm integrity — bit for bit.',
  },
  {
    number: '4',
    title: 'Read Service',
    description:
      'Need to access your data? Our read service retrieves information from your crystal using precision optical equipment — on demand.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-brand-white py-20 text-brand-dark md:py-28">
      <Container>
        <ScrollReveal>
          <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Secure Steps
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              Our Process
            </h2>
            <p className="text-base leading-none text-brand-gray">
              From secure handover to verified storage — built to give you complete
              confidence in your crystal.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.12}>
              <div className="flex flex-col items-center rounded-2xl border border-brand-light bg-white p-6 text-center">
                {/* Number circle */}
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-brand-white">
                  {step.number}
                </div>
                <h3 className="mb-3 text-lg font-bold leading-none text-brand-dark">
                  {step.title}
                </h3>
                <p className="text-sm leading-none text-brand-gray">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom text + CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="mx-auto mb-8 max-w-lg text-sm leading-none text-brand-gray">
              We are continuously expanding our trust services to give you even greater
              confidence in the security, integrity, and accessibility of your data.
            </p>
            <Button href="/technology" variant="primary" size="lg">
              Learn More
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
