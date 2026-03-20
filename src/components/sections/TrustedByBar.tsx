import Image from 'next/image';
import { getPageContent, getContentItems } from '@/lib/content';

const defaultLogos = [
  { name: 'MoMA', logo: '/logos/MOMA.png', width: 92, height: 24, scale: 1 },
  { name: 'Astrolab', logo: '/logos/ASTROLAB.svg', width: 166, height: 43, scale: 0.9 },
  { name: 'Uplift', logo: '/logos/UPLIFT.png', width: 41, height: 41, scale: 1.3 },
  { name: 'GOG', logo: '/logos/GOG.png', width: 46, height: 43, scale: 1.3 },
  { name: 'Soundsfun', logo: '/logos/SOUNDSFUN.svg', width: 83, height: 41, scale: 1 },
  { name: 'Lifeship', logo: '/logos/LIFESHIP.png', width: 124, height: 43, scale: 1.3 },
  { name: 'Boucheron', logo: '/logos/BOUCHERON.png', width: 92, height: 24, scale: 1 },
];

// Map from partner name to sizing info (not stored in DB)
const logoSizing: Record<string, { width: number; height: number; scale: number }> = {
  MoMA: { width: 92, height: 24, scale: 1 },
  Astrolab: { width: 166, height: 43, scale: 0.9 },
  Uplift: { width: 41, height: 41, scale: 1.3 },
  GOG: { width: 46, height: 43, scale: 1.3 },
  Soundsfun: { width: 83, height: 41, scale: 1 },
  Lifeship: { width: 124, height: 43, scale: 1.3 },
  Boucheron: { width: 92, height: 24, scale: 1 },
};

const LOGO_HEIGHT = 21;
const LOGO_HEIGHT_MOBILE = 16;

export default async function TrustedByBar() {
  const content = await getPageContent('home', 'trusted-by', {
    label: 'Trusted by:',
  });

  const dbLogos = await getContentItems<{ name: string; logo: string }>(
    'partner-logo',
    []
  );

  // Merge DB logos with sizing info, or fall back to defaults
  const partnerLogos = dbLogos.length > 0
    ? dbLogos.map((l) => ({
        src: l.logo,
        alt: l.name,
        ...(logoSizing[l.name] || { width: 80, height: 30, scale: 1 }),
      }))
    : defaultLogos.map((l) => ({ src: l.logo, alt: l.name, width: l.width, height: l.height, scale: l.scale }));

  return (
    <section className="border-y border-black/10 bg-[#e4e8ef] px-4 py-5 sm:px-[50px] sm:py-7">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="shrink-0 text-center sm:text-left sm:border-r sm:border-[#d0d0d0] sm:pr-6">
            <p className="text-[8px] font-semibold uppercase text-black">
              {content.label}
            </p>
          </div>
          <div className="min-w-0 w-full flex-1 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
            {/* Mobile: two rows */}
            <div className="flex items-center justify-between sm:contents">
              {partnerLogos.slice(0, 4).map((logo) => {
                const h = Math.round(LOGO_HEIGHT_MOBILE * logo.scale);
                return (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={Math.round((logo.width / logo.height) * h)}
                    height={h}
                    className="shrink-0 object-contain mix-blend-multiply sm:hidden"
                    style={{ height: h, width: 'auto' }}
                    loading="eager"
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between sm:hidden">
              {partnerLogos.slice(4).map((logo) => {
                const h = Math.round(LOGO_HEIGHT_MOBILE * logo.scale);
                return (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={Math.round((logo.width / logo.height) * h)}
                    height={h}
                    className="shrink-0 object-contain mix-blend-multiply"
                    style={{ height: h, width: 'auto' }}
                    loading="eager"
                  />
                );
              })}
            </div>
            {/* Desktop: all logos in one row */}
            {partnerLogos.map((logo) => {
              const h = Math.round(LOGO_HEIGHT * logo.scale);
              return (
                <Image
                  key={`desktop-${logo.alt}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={Math.round((logo.width / logo.height) * h)}
                  height={h}
                  className="hidden shrink-0 object-contain mix-blend-multiply sm:block"
                  style={{ height: h, width: 'auto' }}
                  loading="eager"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
