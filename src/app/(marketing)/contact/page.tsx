import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME, COMPANY_EMAIL } from '@/lib/constants';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the 5D Memory Crystal team. We are here to answer your questions about eternal data storage.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  email: COMPANY_EMAIL,
  description:
    'Manufacturer of 5D Memory Crystal eternal data storage devices, Swiss-made with femtosecond laser writing technology.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
    addressLocality: 'Zurich',
    addressRegion: 'ZH',
  },
  image: `${SITE_URL}/og-image.jpg`,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd} />

      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[40px] font-bold leading-none tracking-[-1.2px] text-[#1a1a1a] lg:text-[60px]">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[17px] font-semibold leading-[22px] text-[#555]">
              Have a question, need a quote, or want to learn more? We would love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <div className="rounded-[22px] bg-[#e4e8ef] p-6 md:p-8">
                <h3 className="text-[20px] font-bold text-[#1a1a1a]">
                  Get in Touch
                </h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5a72be]">
                      Email
                    </h4>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="mt-1 block text-[17px] font-semibold text-[#1a1a1a] transition-colors hover:text-[#5a72be]"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5a72be]">
                      Headquarters
                    </h4>
                    <address className="mt-1 text-[17px] font-semibold not-italic leading-[22px] text-[#555]">
                      5D Memory Crystal AG
                      <br />
                      Zurich, Switzerland
                    </address>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5a72be]">
                      Business Hours
                    </h4>
                    <p className="mt-1 text-[17px] font-semibold text-[#555]">
                      Monday &ndash; Friday: 9:00 &ndash; 18:00 CET
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#5a72be]">
                      Response Time
                    </h4>
                    <p className="mt-1 text-[17px] font-semibold text-[#555]">
                      We typically respond within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
