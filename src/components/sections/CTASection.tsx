import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent } from '@/lib/content';

export default async function CTASection() {
  const content = await getPageContent('home', 'cta', {
    leftLabel: 'Interested in Buying?',
    leftHeading: 'Order directly from here or contact us',
    leftDescription: 'Choose your crystal, upload your data, and receive a permanent record engineered to last billions of years. No subscription, no maintenance — just secure, Swiss-made storage delivered to your door.',
    leftCta1Text: 'Order',
    leftCta1Href: '/contact',
    leftCta2Text: 'Contact Us',
    leftCta2Href: '/contact',
    rightLabel: 'Interested in Partnering?',
    rightHeading: 'Become off-channel partner',
    rightDescription: 'Whether you represent a museum, government body, enterprise, or luxury brand — we offer tailored partnership programmes for resellers, integrators, and institutional clients worldwide.',
    rightCta1Text: 'Become Partner',
    rightCta1Href: '/contact',
    rightCta2Text: 'Contact Us',
    rightCta2Href: '/contact',
  });

  return (
    <section className="border-t border-[#d0d0d0]">
      <div className="grid md:grid-cols-2">
        {/* Left — Interested in Buying */}
        <div className="flex flex-col justify-center bg-[#e4e8ef] px-10 py-16 sm:px-16 lg:px-20 lg:py-24">
          <ScrollReveal>
            <p className="mb-4 text-[20px] font-semibold text-[#1a1a1a]/70">
              {content.leftLabel}
            </p>
            <h2 className="mb-6 text-[36px] font-bold leading-[0.9] tracking-tight text-[#1a1a1a] sm:text-[44px] lg:text-[52px]">
              {content.leftHeading}
            </h2>
            <p className="mb-8 max-w-[400px] text-[17px] font-semibold leading-[22px] text-[#1a1a1a]/70">
              {content.leftDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.leftCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-[#5a72be] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                {content.leftCta1Text}
              </Link>
              <Link
                href={content.leftCta2Href}
                className="text-[15px] font-semibold text-[#5a72be] transition-opacity hover:opacity-70"
              >
                {content.leftCta2Text}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Interested in Partnering */}
        <div className="flex flex-col justify-center bg-[#5a72be] px-10 py-16 sm:px-16 lg:px-20 lg:py-24 -mt-px">
          <ScrollReveal>
            <p className="mb-4 text-[20px] font-semibold text-white/70">
              {content.rightLabel}
            </p>
            <h2 className="mb-6 text-[36px] font-bold leading-[0.9] tracking-[-0.03em] text-white md:text-[32px] lg:text-[36px] xl:text-[44px] 2xl:text-[52px]">
              {content.rightHeading}
            </h2>
            <p className="mb-8 max-w-[460px] text-[17px] font-semibold leading-[22px] text-white/70">
              {content.rightDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.rightCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-white text-[15px] font-semibold text-[#5a72be] transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                {content.rightCta1Text}
              </Link>
              <Link
                href={content.rightCta2Href}
                className="text-[15px] font-semibold text-white transition-opacity hover:opacity-70"
              >
                {content.rightCta2Text}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
