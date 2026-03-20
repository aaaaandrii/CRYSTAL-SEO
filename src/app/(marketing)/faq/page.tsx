import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/constants';
import { faqItems as defaultFaqItems } from '@/data/faq';
import { getContentItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about 5D Memory Crystal technology, ordering, and storage.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

const categoryLabels: Record<string, string> = {
  technology: 'Technology',
  security: 'Security',
  storage: 'Storage',
  ordering: 'Ordering',
};

const categoryOrder = ['technology', 'security', 'storage', 'ordering'];

export default async function FAQPage() {
  const faqItems = await getContentItems<{ question: string; answer: string; category: string }>(
    'faq',
    defaultFaqItems
  );

  const groupedFaqs = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      items: faqItems.filter((item) => item.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] font-semibold leading-none text-[#555]">
              Everything you need to know about 5D Memory Crystal technology and our services.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {groupedFaqs.map((group) => (
              <div key={group.category}>
                <h2 className="mb-6 text-[20px] font-bold text-[#5a72be]">
                  {group.label}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-[16px] border border-[#d0d0d0] bg-[#e4e8ef] transition-colors open:border-[#5a72be]/40"
                    >
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-[#1a1a1a] transition-colors hover:text-[#5a72be] [&::-webkit-details-marker]:hidden">
                        <span className="pr-4 text-[14px] font-semibold">
                          {item.question}
                        </span>
                        <span className="shrink-0 text-[#888] transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="border-t border-[#d0d0d0] px-6 py-4">
                        <p className="text-[14px] font-semibold leading-none text-[#555]">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[14px] font-semibold text-[#555]">
              Still have questions? We are happy to help.
            </p>
            <div className="mt-4">
              <Button href="/contact">Contact Us</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
