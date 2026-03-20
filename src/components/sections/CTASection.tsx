import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function CTASection() {
  return (
    <section className="border-t border-[#d0d0d0]">
      <div className="grid md:grid-cols-2">
        {/* Left — Interested in Buying */}
        <div className="flex flex-col justify-center bg-[#e4e8ef] px-10 py-16 sm:px-16 lg:px-20 lg:py-24">
          <ScrollReveal>
            <p className="mb-4 text-[20px] font-semibold text-[#1a1a1a]/70">
              Interested in Buying?
            </p>
            <h2 className="mb-6 text-[36px] font-bold leading-[0.9] tracking-tight text-[#1a1a1a] sm:text-[44px] lg:text-[52px]">
              Order directly from here or contact us
            </h2>
            <p className="mb-8 max-w-[400px] text-[17px] font-semibold leading-[22px] text-[#1a1a1a]/70">
              Choose your crystal, upload your data, and receive a permanent record engineered to last billions of years. No subscription, no maintenance — just secure, Swiss-made storage delivered to your door.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-[#5a72be] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                Order
              </Link>
              <Link
                href="/contact"
                className="text-[15px] font-semibold text-[#5a72be] transition-opacity hover:opacity-70"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Interested in Partnering */}
        <div className="flex flex-col justify-center bg-[#5a72be] px-10 py-16 sm:px-16 lg:px-20 lg:py-24 -mt-px">
          <ScrollReveal>
            <p className="mb-4 text-[20px] font-semibold text-white/70">
              Interested in Partnering?
            </p>
            <h2 className="mb-6 text-[36px] font-bold leading-[0.9] tracking-[-0.03em] text-white md:text-[32px] lg:text-[36px] xl:text-[44px] 2xl:text-[52px]">
              Become off-channel partner
            </h2>
            <p className="mb-8 max-w-[460px] text-[17px] font-semibold leading-[22px] text-white/70">
              Whether you represent a museum, government body, enterprise, or luxury brand — we offer tailored partnership programmes for resellers, integrators, and institutional clients worldwide.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="flex h-[60px] w-[200px] items-center justify-center rounded-full bg-white text-[15px] font-semibold text-[#5a72be] transition-opacity hover:opacity-90 lg:h-[70px] lg:w-[240px]"
              >
                Become Partner
              </Link>
              <Link
                href="/contact"
                className="text-[15px] font-semibold text-white transition-opacity hover:opacity-70"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
