import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

/**
 * One-shot migration route to sync content edits made on 2026-04-10.
 * Applies all text edits from the client review document + later refinements
 * to PageContent, ContentItem and CaseStudy rows. Idempotent — safe to re-run.
 *
 * Usage: POST (admin session required)
 *   curl -X POST https://<host>/api/admin/sync-content-2026-04-10 \
 *     -H "Cookie: <authjs.session-token>"
 */

type Result = { table: string; key: string; status: 'updated' | 'skipped' | 'error'; detail?: string };

export async function POST() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized — admin only' }, { status: 401 });
  }

  const results: Result[] = [];

  // Helper to update a JSON field inside PageContent.content
  async function updatePageContent(page: string, section: string, patch: Record<string, unknown>) {
    try {
      const existing = await prisma.pageContent.findUnique({
        where: { page_section: { page, section } },
      });
      if (!existing) {
        results.push({ table: 'PageContent', key: `${page}/${section}`, status: 'skipped', detail: 'not found' });
        return;
      }
      const merged = { ...JSON.parse(existing.content), ...patch };
      await prisma.pageContent.update({
        where: { page_section: { page, section } },
        data: { content: JSON.stringify(merged) },
      });
      results.push({ table: 'PageContent', key: `${page}/${section}`, status: 'updated' });
    } catch (err) {
      results.push({ table: 'PageContent', key: `${page}/${section}`, status: 'error', detail: String(err) });
    }
  }

  // Helper to update JSON field inside ContentItem.data, matching by a JSON subpath
  async function updateContentItemByMatch(type: string, match: (data: Record<string, unknown>) => boolean, patch: Record<string, unknown>) {
    try {
      const items = await prisma.contentItem.findMany({ where: { type } });
      const target = items.find((i) => {
        try {
          return match(JSON.parse(i.data));
        } catch {
          return false;
        }
      });
      if (!target) {
        results.push({ table: 'ContentItem', key: type, status: 'skipped', detail: 'no match' });
        return;
      }
      const merged = { ...JSON.parse(target.data), ...patch };
      await prisma.contentItem.update({
        where: { id: target.id },
        data: { data: JSON.stringify(merged) },
      });
      results.push({ table: 'ContentItem', key: `${type}:${String((patch as { title?: string; name?: string; slug?: string }).title ?? (patch as { name?: string }).name ?? (patch as { slug?: string }).slug ?? target.id)}`, status: 'updated' });
    } catch (err) {
      results.push({ table: 'ContentItem', key: type, status: 'error', detail: String(err) });
    }
  }

  // ============ PageContent updates ============
  await updatePageContent('home', 'hero', {
    description:
      '5D Memory Crystal™ stores and preserves your most valuable digital assets using FemtoEtch™ technology into fused quartz glass — virtually indestructible, readable for billions of years, with $0 running storage costs.',
  });

  await updatePageContent('home', 'cta', {
    leftHeading: 'Feel free to contact us to discuss your order.',
  });

  await updatePageContent('home', 'sectors', {
    subheading:
      'From personal legacy preservation and cultural archiving to IP protection, blockchain verification and creativity in luxury goods.',
  });

  await updatePageContent('home', 'comparison', {
    heading: '5D Memory Crystal™ vs Conventional Storage',
  });

  await updatePageContent('home', 'space-proven', {
    label: 'Out of Earth Durability',
    description:
      "5D Memory Crystal™ is a proven data storage medium that has been deployed in space. From the SpaceX Falcon Heavy payload orbiting the Sun to the Arch Mission lunar library, our crystals carry humanity's knowledge beyond Earth — surviving the vacuum, radiation, and temperature extremes of space without degradation.",
    features: [
      'Launched aboard SpaceX Falcon Heavy into solar orbit',
      'Deployed by AstroLab for off-world data preservation',
      'Partnered with LifeShip for genetic preservation',
      'Featured in the MoonMars Museum lunar collection',
    ],
  });

  await updatePageContent('technology', 'hero', {
    description:
      'Data is stored using femtosecond laser pulses into fused quartz glass, creating nanoscale structures that store information across five dimensions. Founded on 30+ years of pioneering research at the University of Southampton.',
  });

  // ============ ContentItem: benefits ============
  await updateContentItemByMatch('benefit', (d) => d.title === 'No Data Loss', {
    description:
      'Hard drives fail. Servers corrupt. Cloud providers shut down. Environmental disasters wipe out systems. 5D Memory Crystal™ removes the risk of losing irreplaceable digital assets forever.',
  });
  await updateContentItemByMatch('benefit', (d) => d.title === 'No Access Loss', {
    description:
      'Format obsolescence, account lockouts, service discontinuation, blocked wallets — 5D Memory Crystal™ data is immutable with random accessibility.',
  });
  await updateContentItemByMatch('benefit', (d) => d.title === 'Legal & Compliance Ready', {
    description:
      'Regulatory mandates require immutable, long-term records. 5D Memory Crystal™ provides tamper-proof storage that satisfies the strictest retention policies.',
  });
  await updateContentItemByMatch('benefit', (d) => d.title === 'Environmental Performance', {
    description:
      'The most sustainable cold data storage medium with zero energy storage costs or requirements. 5D Memory Crystal™ is composed of renewable materials.',
  });
  await updateContentItemByMatch('benefit', (d) => d.title === 'Ultimate Backup', {
    description:
      '5D optical data storage is impervious to extreme heat, subzero temperatures, EMP, space environments, hacking and electromagnetic interference.',
  });

  // ============ ContentItem: media-quote ============
  await updateContentItemByMatch('media-quote', (d) => d.source === 'Guinness World Records' || d.source === 'BBC', {
    quote: "The everlasting 'memory crystals' that could slash data emissions",
    source: 'BBC',
  });
  await updateContentItemByMatch('media-quote', (d) => d.source === 'The Telegraph' || d.source === 'The Register', {
    quote: 'The future of long-term data storage is clear and will last 14 billion years',
    source: 'The Register',
  });

  // ============ ContentItem: sectors ============
  await updateContentItemByMatch('sector', (d) => d.slug === 'space-tech', {
    description:
      'The 5D Memory Crystal engineered to withstand the vacuum, intense radiation, and extreme temperature extremes of space, travel, orbit and lunar landings, without degradation.',
  });
  await updateContentItemByMatch('sector', (d) => d.slug === 'corporate', {
    description:
      'Regulatory archives, intellectual property, research data, and compliance records that must remain immutable and retrievable indefinitely.',
  });
  await updateContentItemByMatch('sector', (d) => d.slug === 'cultural', {
    description:
      "Partnering with the world's museums, libraries, and archives to preserve humanity's most irreplaceable documents and artworks.",
  });
  await updateContentItemByMatch('sector', (d) => d.slug === 'personal', {
    description:
      'Preserve personal and family legacies, photos, videos, letters, and milestones into a crystal keepsake — a permanent gift for generations to come.',
  });

  // ============ ContentItem: process-step ============
  await updateContentItemByMatch('process-step', (d) => d.number === 1, {
    description:
      'Your data is transferred via encrypted channels or air-gapped physical media — it never passes through unsecured networks, and we do not retain any data supplied by clients.',
  });
  await updateContentItemByMatch('process-step', (d) => d.number === 2, {
    description:
      'Every crystal ships with a formal certificate documenting exactly what data has been encoded — your proof of provenance.',
  });
  await updateContentItemByMatch('process-step', (d) => d.number === 3, {
    description:
      'After encoding, the crystal is read back and verified against the original data to confirm integrity — bit for bit.',
  });
  await updateContentItemByMatch('process-step', (d) => d.number === 4, {
    description:
      'Our read service retrieves information from your crystal using precision optical equipment on-site. Individual read machines will be available in late 2027. We also offer a secure Swiss vault service if you want us to store your crystals.',
  });

  // ============ ContentItem: lifespan-bar ============
  await updateContentItemByMatch('lifespan-bar', (d) => typeof d.name === 'string' && (d.name as string).startsWith('5D Memory Crystal'), {
    name: '5D Memory Crystal™',
  });

  // ============ ContentItem: tech-section ============
  await updateContentItemByMatch('tech-section', (d) => d.title === 'The Five Dimensions', {
    description:
      '5D optical data storage uses a FemtoEtch™ process to store information across five dimensions within the structure of fused quartz glass. Three spatial dimensions (x, y, z layering) define the physical position of each data point within the crystal. Two additional optical dimensions are derived from birefringence — the slow axis orientation and retardance strength of self-assembled nanogratings — enabling vastly greater data density and permanence.',
  });
  await updateContentItemByMatch('tech-section', (d) => d.title === 'Environmental Sustainability', {
    description:
      "Global data centres consume 1.5–3% of the world's electricity and generate significant carbon emissions. 5D Memory Crystal™ storage requires zero ongoing energy once data has been written. Write once, store forever — with no cooling infrastructure, no hardware refresh cycles, and no recurring energy cost. A fundamentally more sustainable approach to long-term data preservation.",
  });

  // ============ ContentItem: tech-stat ============
  await updateContentItemByMatch('tech-stat', (d) => d.label === 'Per Disc Capacity' || d.label === 'Potential Per Disc Capacity', {
    label: 'Potential Per Disc Capacity',
  });
  await updateContentItemByMatch('tech-stat', (d) => d.label === 'Years of R&D' || d.label === 'Running Storage Costs', {
    value: '$0',
    label: 'Running Storage Costs',
  });

  // ============ ContentItem: FAQ (replace all) ============
  const faqItems = [
    { question: 'How does this 5D optical storage work?', answer: "The storage medium works by using an extremely fast and precise femtosecond laser to create tiny pits within the fused silica glass containing self-assembled nanostructures (nanogratings). The nanogratings, with features as small as 20 nm, are the smallest embedded structures ever produced by light. They change how light travels through them much in the same way that polarized sunglasses do, allowing scientists to read information about each depending on how the light is transformed. The changes to the light convey five 'dimensions' of information (thus the name), based on each nanostructure's orientation, the strength of the light that it refracts, and its location in space on the x, y, and z axes.", category: 'technology' },
    { question: 'How do nanogratings work?', answer: 'The nanograting produces birefringence in glass, which is characterized by two parameters: slow axis orientation (4th dimension, coinciding also with the orientation of nanograting), and strength of retardance (5th dimension coinciding also with the size of nanograting). During recording the slow axis orientation and strength of retardance are controlled respectively by the polarization and intensity of light. If you add the two optical dimensions to three spatial co-ordinates the result is "5D data storage".', category: 'technology' },
    { question: 'How does this compare to conventional optical storage media?', answer: 'By comparison, CDs only have two "dimensions" of information — reflecting or not reflecting laser light to convey the 1s and 0s of binary data in a single layer of plastic. In DVDs, the data is stored by burning tiny pits on multiple layers on the plastic disc, which means you are using three spatial dimensions to store information. With our technology, we exploit two additional, optical dimensions with fused silica glass.', category: 'technology' },
    { question: 'How is it different from storing information on hard drives?', answer: 'Semiconductor data storage such as flash drives and solid-state drives provide a lifespan around ten years. For magnetization-based memory, such as HDD, needs to transfer data every couple of years in order to prevent data loss, while the data stored in conventional optical discs such as CD, DVD, HD DVD and Blu-ray only last tens of years. Other devices such as holographic memory can only reach the lifetime of a few decades.', category: 'storage' },
    { question: 'Why do we need this type of storage?', answer: 'Despite all technological progress it is still difficult to securely store large amounts of information over even relatively short timescales of 100 years. Our 5D data storage technology eliminates this problem by storing high capacity digital information that could survive the human race.', category: 'storage' },
    { question: 'How big is the 5D disc itself?', answer: 'The technology exploits high purity glass substrates, which can reach various sizes up several meters. We are currently using 25 mm diameter discs, which are easy to handle and investigate. However, in future as we move towards commercialization, we might look into standard sizes of optical discs i.e. 12 cm diameter, which should ultimately fit about 360 TB.', category: 'technology' },
    { question: 'How much can each disc store?', answer: 'The current achievable density is several TB per disc (CD size of 12 cm, 1.2 mm thickness), which is of the same order as magnetic disk data storage. In a couple of years, we hope to achieve about 20 TB per disc. We estimate the ultimate capacity of 360 TB per disc using this technology.', category: 'storage' },
    { question: 'How robust is it?', answer: 'The 5D storage has extremely high data stability because the information is recorded in structural modifications within fused quartz glass, one of the most chemically and thermally durable materials on Earth. The discs can withstand fire and temperatures of up to 1000°C. The glass can withstand direct impact of up to ½ ton.', category: 'storage' },
    { question: 'How long will the data last?', answer: 'The decay time of nanogratings is about 10²⁰ years at room temperature, indicating unprecedented stability. Even at elevated temperatures of 190°C the extrapolated decay time is comparable with the age of the Universe — 13.8 billion years.', category: 'storage' },
    { question: 'How would instructions for accessing the information be communicated to whoever discovers these devices in the future?', answer: 'The technology of 5D writing allows high-resolution drawings and graphics to be printed in the same disc at the data. Visual instructions for reading the disc can be imprinted, and holograms can be recorded using the same technology in the disc.', category: 'technology' },
  ];
  try {
    await prisma.contentItem.deleteMany({ where: { type: 'faq' } });
    for (let i = 0; i < faqItems.length; i++) {
      await prisma.contentItem.create({
        data: {
          type: 'faq',
          data: JSON.stringify(faqItems[i]),
          sortOrder: i,
          published: true,
        },
      });
    }
    results.push({ table: 'ContentItem', key: 'faq (replaced)', status: 'updated', detail: `${faqItems.length} items` });
  } catch (err) {
    results.push({ table: 'ContentItem', key: 'faq', status: 'error', detail: String(err) });
  }

  // ============ CaseStudy updates ============
  try {
    await prisma.caseStudy.update({
      where: { slug: 'boucheron-heritage-preservation' },
      data: {
        title: 'Boucheron Quatre 5D Memory Ring',
        client: 'Boucheron',
        excerpt: 'Boucheron Creation Fusion — Quatre 5D Memory ring, unveiled 20th November 2024.',
        challenge:
          'Boucheron wanted to push the boundaries of creativity, art and high tech for its 2024 unveiling of its iconic Quatre Collection.',
        solution:
          'Using SPhotonix 5D Memory Crystal™ technology, we collaborated with the French jewellery maison to create a unique diamond crystal that contained the childhood memory of the seaside with a custom created score by IRAM representing the sound of water. 100 MB of data was preserved in the tiny crystal.',
        outcome:
          "The signature 'Quatre 5D Memory ring' was revealed as part of Boucheron opening of their first ever US store in New York. Debuting in Manhattan, the crystal is the first time high end luxury and art has combined with 5D optical data technology, a fusion of beauty and tech.",
        content: '',
      },
    });
    results.push({ table: 'CaseStudy', key: 'boucheron-heritage-preservation', status: 'updated' });
  } catch (err) {
    results.push({ table: 'CaseStudy', key: 'boucheron-heritage-preservation', status: 'error', detail: String(err) });
  }

  try {
    await prisma.caseStudy.update({
      where: { slug: 'gog-digital-archive' },
      data: {
        title: 'GOG — Heroes of Might and Magic III Preservation',
        client: 'GOG',
        excerpt: 'Preserving an iconic video game forever in 5D Memory Crystal™.',
        challenge:
          'GOG has developed a preservation program that means classic video games are playable now and in the future. GOG wanted to see how to preserve an iconic game, Heroes of Might and Magic III, could be stored and accessible forever.',
        solution:
          "Working with GOG and understanding their passion for digital preservation of video games, now a key element of humanity's culture and society, we looked at how digital files of the game could be transferred and femtoetched™ into a 5D Memory Crystal™. The crystal is a 50mm diameter, 6mm thick round sample, with 1GB of stored data.",
        outcome:
          'The GOG 5D Memory Crystal™ now contains the full digital data files for Heroes of Might and Magic III meaning that future generations are able to enjoy the game no matter what happens. The crystal has beautiful artwork, as well as random access to all data stored.',
        content: '',
      },
    });
    results.push({ table: 'CaseStudy', key: 'gog-digital-archive', status: 'updated' });
  } catch (err) {
    results.push({ table: 'CaseStudy', key: 'gog-digital-archive', status: 'error', detail: String(err) });
  }

  // Vatican → Human Genome Preservation (rename via update by old or new slug)
  try {
    const existing =
      (await prisma.caseStudy.findUnique({ where: { slug: 'human-genome-preservation' } })) ||
      (await prisma.caseStudy.findUnique({ where: { slug: 'vatican-library-preservation' } }));

    if (existing) {
      await prisma.caseStudy.update({
        where: { id: existing.id },
        data: {
          slug: 'human-genome-preservation',
          title: 'Human Genome Preservation',
          client: 'Human Genome Preservation',
          sector: 'dna',
          excerpt: 'Preserving the human genome for eternity, etched into 5D Memory Crystal™.',
          challenge:
            'Professor Peter Kazansky wanted to see if it was possible to store the human genome for eternity using his femtoetch™ onto a crystal, inspired by the passing of a close family member.',
          solution:
            'Working with his team and scientists at HelixWorks, human DNA was digitised to binary code before ultra fast lasers etched it into the structure of the 5D Memory Crystal™.',
          outcome:
            'The crystal includes a visual key to show details about what data is stored inside and how it could be used by a future intelligence — species or machine — to create a human. The key shows the universal elements (hydrogen, oxygen, carbon and nitrogen); the four bases of the DNA molecule (adenine, cytosine, guanine and thymine) with their molecular structure; their placement in the double helix structure of DNA; and how genes position into a chromosome, which can then be inserted into a cell.',
          content: '',
        },
      });
      results.push({ table: 'CaseStudy', key: 'human-genome-preservation', status: 'updated' });
    } else {
      results.push({ table: 'CaseStudy', key: 'human-genome-preservation', status: 'skipped', detail: 'neither slug found' });
    }
  } catch (err) {
    results.push({ table: 'CaseStudy', key: 'human-genome-preservation', status: 'error', detail: String(err) });
  }

  // Revalidate all affected paths
  try {
    revalidatePath('/');
    revalidatePath('/technology');
    revalidatePath('/services');
    revalidatePath('/faq');
    revalidatePath('/case-studies');
    revalidatePath('/case-studies/[slug]', 'page');
  } catch {
    // non-fatal
  }

  const summary = {
    total: results.length,
    updated: results.filter((r) => r.status === 'updated').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    errors: results.filter((r) => r.status === 'error').length,
  };

  return NextResponse.json({ summary, results });
}
