import Image from 'next/image';
import Container from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent, getContentItems } from '@/lib/content';
import { benefits as defaultBenefits } from '@/data/benefits';

export default async function BenefitsSection() {
  const content = await getPageContent('home', 'benefits', {
    heading: 'Every reason to choose permanent storage.',
  });

  const benefits = await getContentItems<{ icon: string; title: string; description: string }>(
    'benefit',
    defaultBenefits
  );

  return (
    <section id="benefits" className="bg-brand-white py-20 text-brand-dark md:py-28">
      <Container>
        <ScrollReveal>
          <h2 className="mb-12 max-w-xl text-4xl font-bold leading-none tracking-tight text-brand-dark sm:text-5xl md:mb-16 lg:text-6xl">
            {content.heading}
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <div className="group rounded-2xl border border-brand-light bg-white p-8 transition-all duration-300 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/5">
                <div className="mb-5">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-none text-brand-dark">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-none text-brand-gray">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
