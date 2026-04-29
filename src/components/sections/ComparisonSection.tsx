import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getPageContent, getContentItems } from '@/lib/content';

const defaultTableRows = [
  { feature: 'Lifespan', crystal: '13.8 Billion yrs', hdd: '5–10 years', tape: '30–50 years' },
  { feature: 'Heat Resistance', crystal: 'Up to 1,000 °C', hdd: 'Low', tape: 'Moderate' },
  { feature: 'EMP / Radiation', crystal: 'Fully resistant', hdd: 'Vulnerable', tape: 'Vulnerable' },
  { feature: 'Physical medium', crystal: 'Fused quartz glass', hdd: 'Magnetic / Silicon', tape: 'Polymer tape / Server' },
  { feature: 'Read without power', crystal: 'Yes (optical)', hdd: 'No', tape: 'No' },
  { feature: 'Ongoing energy cost', crystal: 'None', hdd: 'Continuous', tape: 'Continuous' },
  { feature: 'Cyber attack surface', crystal: 'Zero (air-gapped)', hdd: 'High', tape: 'High' },
];

const defaultLifespanBars = [
  { name: '5D Memory Crystal™', years: '100,000,000,000,000,000,000', mobileYears: '100Q+', unit: 'YEARS', highlight: true },
  { name: 'Silica Disc', years: '100,000,000', mobileYears: '100M', unit: 'YEARS', highlight: false },
  { name: 'Magnetic Tape (LTO)', years: '30', mobileYears: '30', unit: 'YEARS', highlight: false },
  { name: 'SSD', years: '5-10', mobileYears: '5-10', unit: 'YEARS', highlight: false },
  { name: 'HDD', years: '3-5', mobileYears: '3-5', unit: 'YEARS', highlight: false },
];

const stripWidths: Record<string, number> = {
  'Silica Disc': 10,
  'Magnetic Tape (LTO)': 1,
  'SSD': 1,
  'HDD': 1,
};

export default async function ComparisonSection() {
  const content = await getPageContent('home', 'comparison', {
    label: 'Comparison',
    heading: '5D Memory Crystal™ vs Conventional Storage',
    description: 'No degradation. No magnetic fields. No moving parts. Just light encoded into glass.',
  });

  const tableRows = await getContentItems<{ feature: string; crystal: string; hdd: string; tape: string }>(
    'comparison-row',
    defaultTableRows
  );

  const lifespanBars = await getContentItems<{ name: string; years: string; mobileYears: string; unit: string; highlight: boolean }>(
    'lifespan-bar',
    defaultLifespanBars
  );

  return (
    <section id="comparison" className="overflow-x-hidden bg-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-[50px]">
        {/* Split layout: Text left, Table right */}
        <div className="flex min-w-0 flex-col items-start gap-12 lg:flex-row lg:gap-8">
          {/* Left: Heading */}
          <ScrollReveal>
            <div className="w-full shrink-0 lg:w-[500px]">
              <p className="mb-3 text-xs font-semibold uppercase text-[#888]">
                {content.label}
              </p>
              <h2 className="mb-6 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[38px] lg:text-[42px]">
                {content.heading}
              </h2>
              <p className="max-w-[348px] text-[20px] font-semibold leading-none text-[#bbb]">
                {content.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Table */}
          <ScrollReveal delay={0.15} className="min-w-0 w-full">
            <div className="overflow-hidden rounded-[14px] border border-[#444]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#5a72be]">
                      <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">Feature</th>
                      <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">5D Crystal</th>
                      <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">HDD / SSD</th>
                      <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">Tape / Cloud</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={index < tableRows.length - 1 ? 'border-b border-[#444]' : ''}
                      >
                        <td className="whitespace-nowrap px-3 py-3 text-[11px] font-semibold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">{row.feature}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-[11px] font-bold leading-tight text-white sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">{row.crystal}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-[11px] font-semibold leading-tight text-[#888] sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">{row.hdd}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-[11px] font-semibold leading-tight text-[#888] sm:whitespace-normal sm:px-5 sm:py-4 sm:text-[15px] sm:leading-tight">{row.tape}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Lifespan Bars */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex flex-col gap-[10px]">
            {lifespanBars.map((bar) => (
              <div
                key={bar.name}
                className={`relative flex items-center justify-between overflow-hidden rounded-[12px] px-4 py-4 sm:rounded-[20px] sm:px-8 sm:py-7 ${
                  bar.highlight
                    ? 'bg-[#5a72be]'
                    : 'bg-[#141425]'
                }`}
              >
                {!bar.highlight && (
                  <div
                    className="absolute left-0 top-0 h-full bg-[#5a72be]"
                    style={{ width: `${stripWidths[bar.name] ?? 5}px` }}
                  />
                )}
                <span className="relative z-10 text-[16px] font-bold leading-none text-white sm:text-[28px] lg:text-[42px]">
                  {bar.name}
                </span>
                <span className="relative z-10 text-[10px] font-bold leading-none tracking-wider text-white sm:text-[14px] lg:text-[20px]">
                  <span className="sm:hidden">{bar.mobileYears} {bar.unit}</span>
                  <span className="hidden sm:inline">{bar.years} {bar.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
