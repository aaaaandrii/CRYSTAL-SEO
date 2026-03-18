import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function CTASection() {
  return (
    <section id="cta" className="bg-brand-dark py-20 md:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Card: Order / Contact */}
          <ScrollReveal direction="left">
            <div className="flex h-full flex-col items-start justify-between rounded-2xl border border-brand-border bg-brand-navy p-8 md:p-10">
              <div>
                <h3 className="mb-4 text-2xl font-bold leading-none text-brand-white sm:text-3xl">
                  Ready to Preserve Your Data Forever?
                </h3>
                <p className="mb-8 text-lg leading-none text-brand-gray">
                  Order directly from here or contact us to discuss your specific data
                  preservation needs. Our team is ready to help.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button href="/order" variant="primary" size="lg">
                  Order Now
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Card: Partner */}
          <ScrollReveal direction="right">
            <div className="flex h-full flex-col items-start justify-between rounded-2xl border border-brand-border bg-brand-navy p-8 md:p-10">
              <div>
                <h3 className="mb-4 text-2xl font-bold leading-none text-brand-white sm:text-3xl">
                  Become a Partner
                </h3>
                <p className="mb-8 text-lg leading-none text-brand-gray">
                  We are always looking for channel partners to expand the reach of 5D
                  Memory Crystal technology. Join our global network of resellers and
                  integrators.
                </p>
              </div>
              <Button href="/partners" variant="secondary" size="lg">
                Become a Partner
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
