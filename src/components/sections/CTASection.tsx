import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent } from '@/lib/content';

export default async function CTASection() {
  const content = await getPageContent('home', 'cta', {
    leftLabel: 'Interested in Buying?',
    leftHeading: 'Feel free to contact us to discuss your order.',
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
    <section className="relative">
      {/* Background colors — edge to edge */}
      <div className="absolute inset-0 hidden md:grid md:grid-cols-2">
        <div className="bg-[#e4e8ef]" />
        <div className="bg-[#5a72be]" />
      </div>

      {/* Content — constrained to max-w-7xl */}
      <div className="relative">
        {/* Mobile: stacked */}
        <div className="bg-[#e4e8ef] px-6 py-16 sm:px-[50px] md:hidden">
          <ScrollReveal>
            <p className="mb-6 text-xs font-semibold uppercase text-[#1a1a1a]/70">
              {content.leftLabel}
            </p>
            <h2 className="mb-10 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              {content.leftHeading}
            </h2>
            <p className="mb-10 max-w-[460px] text-[14px] font-semibold leading-none text-[#1a1a1a]/70">
              {content.leftDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.leftCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-[#5a72be] text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                {content.leftCta1Text}
              </Link>
              <Link
                href={content.leftCta2Href}
                className="text-[12px] font-semibold text-[#5a72be] transition-opacity hover:opacity-70"
              >
                {content.leftCta2Text}
              </Link>
            </div>
          </ScrollReveal>
        </div>
        <div className="bg-[#5a72be] px-6 py-16 sm:px-[50px] md:hidden">
          <ScrollReveal>
            <p className="mb-6 text-xs font-semibold uppercase text-white/70">
              {content.rightLabel}
            </p>
            <h2 className="mb-10 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              {content.rightHeading}
            </h2>
            <p className="mb-10 max-w-[460px] text-[14px] font-semibold leading-none text-white/70">
              {content.rightDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.rightCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-white text-[12px] font-semibold text-[#5a72be] transition-opacity hover:opacity-90"
              >
                {content.rightCta1Text}
              </Link>
              <Link
                href={content.rightCta2Href}
                className="text-[12px] font-semibold text-white transition-opacity hover:opacity-70"
              >
                {content.rightCta2Text}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Desktop: side-by-side inside max-w-7xl */}
        <div className="mx-auto hidden max-w-7xl grid-cols-2 px-6 py-24 sm:px-[50px] md:grid">
          {/* Left */}
          <ScrollReveal>
            <p className="mb-6 text-xs font-semibold uppercase text-[#1a1a1a]/70">
              {content.leftLabel}
            </p>
            <h2 className="mb-10 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a] sm:text-[38px] lg:text-[42px]">
              {content.leftHeading}
            </h2>
            <p className="mb-10 max-w-[460px] text-[14px] font-semibold leading-none text-[#1a1a1a]/70">
              {content.leftDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.leftCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-[#5a72be] text-[12px] font-semibold text-white transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                {content.leftCta1Text}
              </Link>
              <Link
                href={content.leftCta2Href}
                className="text-[12px] font-semibold text-[#5a72be] transition-opacity hover:opacity-70"
              >
                {content.leftCta2Text}
              </Link>
            </div>
          </ScrollReveal>

          {/* Right */}
          <div className="pl-6 sm:pl-[50px]">
          <ScrollReveal>
            <p className="mb-6 text-xs font-semibold uppercase text-white/70">
              {content.rightLabel}
            </p>
            <h2 className="mb-10 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              {content.rightHeading}
            </h2>
            <p className="mb-10 max-w-[460px] text-[14px] font-semibold leading-none text-white/70">
              {content.rightDescription}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href={content.rightCta1Href}
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-white text-[12px] font-semibold text-[#5a72be] transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                {content.rightCta1Text}
              </Link>
              <Link
                href={content.rightCta2Href}
                className="text-[12px] font-semibold text-white transition-opacity hover:opacity-70"
              >
                {content.rightCta2Text}
              </Link>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
