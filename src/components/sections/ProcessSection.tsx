import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent, getContentItems } from '@/lib/content';

const defaultSteps = [
  { number: 1, title: 'Secure Data Transfer', description: 'Your data is transferred via encrypted channels or air-gapped physical media — it never passes through unsecured networks, and we do not retain any data supplied by clients.' },
  { number: 2, title: 'Certificate of Authority', description: 'Every crystal ships with a formal certificate documenting exactly what data has been encoded — your proof of provenance.' },
  { number: 3, title: 'Data Verification', description: 'After encoding, the crystal is read back and verified against the original data to confirm integrity — bit for bit.' },
  { number: 4, title: 'Read Service', description: 'Our read service retrieves information from your crystal using precision optical equipment on-site. Individual read machines will be available in late 2027. We also offer a secure Swiss vault service if you want us to store your crystals.' },
];

export default async function ProcessSection() {
  const content = await getPageContent('home', 'process', {
    label: 'Secure Steps',
    heading: 'Our Process',
    description: 'From secure handover to verified storage — built to give you complete confidence in your crystal.',
    bottomText: 'We are continuously expanding our trust services to give you even greater confidence in the security, integrity, and accessibility of your data.',
    ctaText: 'Learn More',
    ctaHref: '/technology',
  });

  const steps = await getContentItems<{ number: number; title: string; description: string }>(
    'process-step',
    defaultSteps
  );

  return (
    <section id="process" className="bg-brand-white py-20 text-brand-dark md:py-28">
      <Container>
        <ScrollReveal>
          <div className="mx-auto mb-10 max-w-xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">
              {content.label}
            </p>
            <h2 className="mb-4 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              {content.heading}
            </h2>
            <p className="text-[14px] font-semibold leading-none text-[#555]">
              {content.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.12}>
              <div className="flex flex-col items-center rounded-2xl border border-brand-light bg-white p-6 text-center">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-brand-white">
                  {step.number}
                </div>
                <h3 className="mb-3 text-lg font-bold leading-none text-brand-dark">
                  {step.title}
                </h3>
                <p className="text-[14px] font-semibold leading-none text-[#555]">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom text + CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="mx-auto mb-8 max-w-lg text-[14px] font-semibold leading-none text-[#555]">
              {content.bottomText}
            </p>
            <Button href={content.ctaHref} variant="primary" size="lg">
              {content.ctaText}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
