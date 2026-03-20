import Image from 'next/image';

const partnerLogos = [
  { src: '/logos/MOMA.png', alt: 'MoMA', width: 92, height: 24, scale: 1 },
  { src: '/logos/ASTROLAB.svg', alt: 'Astrolab', width: 166, height: 43, scale: 0.9 },
  { src: '/logos/UPLIFT.png', alt: 'Uplift', width: 41, height: 41, scale: 1.3 },
  { src: '/logos/GOG.png', alt: 'GOG', width: 46, height: 43, scale: 1.3 },
  { src: '/logos/SOUNDSFUN.svg', alt: 'Soundsfun', width: 83, height: 41, scale: 1 },
  { src: '/logos/LIFESHIP.png', alt: 'Lifeship', width: 124, height: 43, scale: 1.3 },
  { src: '/logos/BOUCHERON.png', alt: 'Boucheron', width: 92, height: 24, scale: 1 },
];

/* Uniform rendered height for all logos (px) */
const LOGO_HEIGHT = 21;
const LOGO_HEIGHT_MOBILE = 16;

export default function TrustedByBar() {
  return (
    <section className="border-y border-black/10 bg-[#e4e8ef] px-4 py-5 sm:px-[50px] sm:py-7">
      <div className="mx-auto max-w-7xl">
        {/* Mobile: label on top, logos wrap into two rows */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Label */}
          <div className="shrink-0 text-center sm:text-left sm:border-r sm:border-[#d0d0d0] sm:pr-6">
            <p className="text-[12px] font-semibold uppercase text-black">
              Trusted by:
            </p>
          </div>
          {/* Logos — 4-col grid on mobile aligned to edges, single row on desktop */}
          <div className="min-w-0 w-full flex-1 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
            {/* Mobile: two rows, justify-between each */}
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
