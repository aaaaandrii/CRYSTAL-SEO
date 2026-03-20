import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SITE_URL, COMPANY_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Order Now',
  description:
    'Order your 5D Memory Crystal today. Choose from personal, professional, and enterprise-grade eternal storage solutions.',
  alternates: {
    canonical: `${SITE_URL}/order`,
  },
};

const products = [
  {
    name: 'Nano Crystal',
    capacity: 'Up to 5 GB',
    price: 'From CHF 149',
    description:
      'Ideal for personal messages, photos, and small keepsakes. A meaningful gift that lasts forever.',
    features: [
      'Personal data encoding',
      'Gift-ready presentation box',
      'Certificate of authenticity',
      'Standard delivery',
    ],
  },
  {
    name: 'Standard Crystal',
    capacity: 'Up to 100 GB',
    price: 'From CHF 499',
    popular: true,
    description:
      'Our most popular option for families and professionals. Stores documents, photo libraries, and important records.',
    features: [
      'Priority data encoding',
      'Premium presentation case',
      'Certificate of authenticity',
      'Verification QR code',
      'Express delivery available',
    ],
  },
  {
    name: 'Archive Crystal',
    capacity: 'Up to 360 TB',
    price: 'Custom Pricing',
    description:
      'Enterprise-grade storage for institutions, governments, and large organisations requiring maximum capacity.',
    features: [
      'Dedicated encoding pipeline',
      'Air-gapped facility processing',
      'Full chain-of-custody documentation',
      'Custom packaging and branding',
      'Secure courier delivery',
      'Dedicated account manager',
    ],
  },
];

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#e4e8ef] py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              Order Now
            </h1>
            <p className="mx-auto mt-4 max-w-[500px] text-[14px] font-semibold leading-none text-[#555]">
              Choose the crystal that fits your needs. All crystals are manufactured in Switzerland and include a certificate of authenticity.
            </p>
          </div>
        </Container>
      </section>

      {/* Product Cards */}
      <section className="bg-white py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className={`relative flex flex-col rounded-[22px] p-6 md:p-8 ${
                  product.popular
                    ? 'border-2 border-[#5a72be] bg-[#e4e8ef] shadow-lg shadow-[#5a72be]/10'
                    : 'border border-[#d0d0d0] bg-[#e4e8ef]'
                }`}
              >
                {product.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5a72be] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-[20px] font-bold text-[#1a1a1a]">
                  {product.name}
                </h3>
                <p className="mt-1 text-[14px] font-semibold text-[#5a72be]">
                  {product.capacity}
                </p>
                <p className="mt-3 text-[14px] font-semibold leading-none text-[#555]">
                  {product.description}
                </p>
                <p className="mt-4 text-[28px] font-bold text-[#1a1a1a]">
                  {product.price}
                </p>

                <ul className="mt-6 flex-1 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[15px] font-semibold text-[#555]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5a72be]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href="/schedule-demo"
                    size="md"
                    variant={product.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {product.price === 'Custom Pricing'
                      ? 'Contact Sales'
                      : 'Order Now'}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Custom Orders */}
      <section className="bg-black py-20 md:py-[88px]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              Need a Custom Solution?
            </h2>
            <p className="mt-4 text-[14px] font-semibold leading-none text-[#bbb]">
              For bespoke crystal configurations, bulk orders, or
              specialised encoding requirements, our team is ready to help.
            </p>
            <p className="mt-6 text-[14px] font-semibold text-[#bbb]">
              Email us at{' '}
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="font-semibold text-[#5a72be] underline underline-offset-4 transition-colors hover:text-white"
              >
                {COMPANY_EMAIL}
              </a>{' '}
              or schedule a consultation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/schedule-demo">Schedule a Consultation</Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
