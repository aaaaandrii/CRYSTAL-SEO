import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'dev.db');
const db = (await import('better-sqlite3')).default(dbPath);

function cuid() {
  return 'c' + randomBytes(12).toString('hex');
}

const now = new Date().toISOString();

// Clear existing tables
db.exec('DELETE FROM ContentItem');
db.exec('DELETE FROM PageContent');
db.exec('DELETE FROM NewsArticle');
db.exec('DELETE FROM CaseStudy');
db.exec('DELETE FROM User');

// ── Helpers ────────────────────────────────────────────────────────────
const insertPageContent = db.prepare(
  `INSERT INTO PageContent (id, page, section, content, updatedAt) VALUES (?, ?, ?, ?, ?)`
);
const insertContentItem = db.prepare(
  `INSERT INTO ContentItem (id, type, data, sortOrder, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`
);

function seedPageContent(page, section, content) {
  insertPageContent.run(cuid(), page, section, JSON.stringify(content), now);
}

function seedContentItem(type, data, sortOrder) {
  insertContentItem.run(cuid(), type, JSON.stringify(data), sortOrder, 1, now, now);
}

// ── Admin User ─────────────────────────────────────────────────────────
const adminHash = '$2b$10$/7pC97h..po2B3AdgWbyPe5Sp582TU0unJMoiBuFnExinp4lwLMR6';
db.prepare(`INSERT INTO User (id, email, name, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`)
  .run(cuid(), 'pavlovdrey@gmail.com', 'Andrii Pavlov', adminHash, 'admin', now, now);

// ═══════════════════════════════════════════════════════════════════════
// PAGE CONTENT (section text/config for each page)
// ═══════════════════════════════════════════════════════════════════════

// ── Homepage: Hero ─────────────────────────────────────────────────────
seedPageContent('home', 'hero', {
  badges: ['Made in Switzerland', 'Guinness World Record', 'Private and Secure'],
  heading: 'The Most Durable Storage in the World',
  headingSuperscript: '*',
  footnote: '*According to Guinness World Record Book',
  description: '5D Memory Crystal encodes your most valuable digital assets into fused quartz glass — virtually indestructible, readable for billions of years, with zero ongoing energy cost.',
  cta1Text: 'Order Crystal',
  cta1Href: '/contact',
  cta2Text: 'Learn More',
  cta2Href: '/technology',
  lifespanLabel: 'LIFESPAN: 100,000,000,000,000,000,000 YEARS',
  videoSrc: '/videos/hero-main-video-upd.mp4',
});

// ── Homepage: Recognition ──────────────────────────────────────────────
seedPageContent('home', 'recognition', {
  heading: 'Recognised by worlds leading media',
  bottomText: 'Our crystal technology even appeared in Mission: Impossible — The Final Reckoning and has been exhibited at the V&A Museum in London.',
});

// ── Homepage: Benefits ─────────────────────────────────────────────────
seedPageContent('home', 'benefits', {
  heading: 'Every reason to choose permanent storage.',
});

// ── Homepage: Comparison ───────────────────────────────────────────────
seedPageContent('home', 'comparison', {
  label: 'Comparison',
  heading: '5D Memory Crystal vs Conventional Storage',
  description: 'No degradation. No magnetic fields. No moving parts. Just light encoded into glass.',
});

// ── Homepage: Sectors ──────────────────────────────────────────────────
seedPageContent('home', 'sectors', {
  label: 'What we offer',
  heading: 'Storage Solutions for Every Sector',
  subheading: 'From personal keepsakes to enterprise-grade archival, luxury goods, and blockchain verification.',
});

// ── Homepage: Process ──────────────────────────────────────────────────
seedPageContent('home', 'process', {
  label: 'Secure Steps',
  heading: 'Our Process',
  description: 'From secure handover to verified storage — built to give you complete confidence in your crystal.',
  bottomText: 'We are continuously expanding our trust services to give you even greater confidence in the security, integrity, and accessibility of your data.',
  ctaText: 'Learn More',
  ctaHref: '/process',
});

// ── Homepage: Swiss Made ───────────────────────────────────────────────
seedPageContent('home', 'swiss-made', {
  label: 'Security & Provenance',
  heading: 'Swiss Made',
  description: 'Every 5D Memory Crystal is produced in a secure Swiss facility — combining the highest standards of precision engineering with world-renowned data privacy protections. From raw fused quartz to finished crystal, the entire process takes place under controlled, auditable conditions.',
  ctaText: 'Learn More',
  ctaHref: '/process',
  image: '/images/swiss-facility.png',
  features: [
    'Swiss-based production with full chain of custody',
    'Air-gapped encoding — your data never touches the internet',
    'No third-party access at any stage of manufacturing',
    'Tamper-evident packaging and secure delivery',
  ],
});

// ── Homepage: Space Proven ─────────────────────────────────────────────
seedPageContent('home', 'space-proven', {
  label: 'Out of Earth Durability',
  heading: 'Space Proven',
  description: "5D Memory Crystal is the only data storage medium that has been deployed in space. From the SpaceX Falcon Heavy payload orbiting the Sun to the Arch Mission lunar library, our crystals carry humanity's knowledge beyond Earth — surviving the vacuum, radiation, and temperature extremes of space without degradation.",
  ctaText: 'Learn More',
  ctaHref: '/technology',
  image: '/images/space-proven-2.png',
  features: [
    'Launched into solar orbit aboard SpaceX Missions',
    'Used both on SpaceX Falcon Heavy and Falcon 9',
    'Used by AstroLab and LifeShip for off-world data preservation',
    'Resistant to cosmic radiation, vacuum, and extreme thermal cycling',
  ],
});

// ── Homepage: Case Studies section text ────────────────────────────────
seedPageContent('home', 'case-studies', {
  heading: 'Case Studies',
  description: 'From space missions to cultural institutions — see who is preserving their most critical data with us.',
  ctaText: 'View All Cases',
  ctaHref: '/case-studies',
});

// ── Homepage: News section text ────────────────────────────────────────
seedPageContent('home', 'news', {
  label: 'Latest News',
  heading: 'News & Updates',
  ctaText: 'View All News',
  ctaHref: '/news',
});

// ── Homepage: Save Data ────────────────────────────────────────────────
seedPageContent('home', 'save-data', {
  heading: 'Save Your Most Valuable Data',
  description: '5D Memory Crystal is ideal for storing data, that you cannot afford to lose.',
  cta1Text: 'Order Crystal',
  cta1Href: '/contact',
  cta2Text: 'Schedule a Call',
  cta2Href: '/schedule-demo',
});

// ── Homepage: CTA ──────────────────────────────────────────────────────
seedPageContent('home', 'cta', {
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

// ── Homepage: Trusted By ───────────────────────────────────────────────
seedPageContent('home', 'trusted-by', {
  label: 'Trusted by:',
});

// ═══════════════════════════════════════════════════════════════════════
// CONTENT ITEMS (list-based content)
// ═══════════════════════════════════════════════════════════════════════

// ── Benefits ───────────────────────────────────────────────────────────
const benefits = [
  { icon: '/icons/no-data-loss.svg', title: 'No Data Loss', description: 'Hard drives fail. Cloud providers shut down. 5D crystal removes the risk of losing irreplaceable digital assets forever.' },
  { icon: '/icons/no-access-loss.svg', title: 'No Access Loss', description: 'Format obsolescence, account lockouts, service discontinuation — crystal data is readable with basic optics, no subscription needed.' },
  { icon: '/icons/Legal & Compliance Ready.svg', title: 'Legal & Compliance Ready', description: 'Regulatory mandates require immutable, long-term records. Crystal provides tamper-proof storage that satisfies the strictest retention policies.' },
  { icon: '/icons/cyber-security.svg', title: 'Cyber Security Proofed', description: 'Fully air-gapped, offline, and immune to ransomware. No network connection means zero attack surface for your most sensitive data.' },
  { icon: '/icons/Environmental Performance.svg', title: 'Environmental Performance', description: 'Data centres consume 1-2% of global electricity. Crystal requires zero energy to maintain — write once, store forever with no carbon footprint.' },
  { icon: '/icons/Ultimate Backup.svg', title: 'Ultimate Backup', description: 'The ultimate last line of defence. A crystal backup survives fires, floods, EMP, and electromagnetic interference that would destroy any conventional copy.' },
];
benefits.forEach((b, i) => seedContentItem('benefit', b, i));

// ── Sectors ────────────────────────────────────────────────────────────
const sectors = [
  { slug: 'space-tech', title: 'Space Tech', description: 'The 5D Memory Crystal engineered to withstand the vacuum, intense radiation, and extreme temperature extremes of space without degradation.', image: '/sectors/Space.png', icon: '🚀' },
  { slug: 'corporate', title: 'Corporate & Legal', description: 'Regulatory archives, intellectual property, and compliance records that must remain immutable and retrievable indefinitely.', image: '/sectors/corporate.png', icon: '🏢' },
  { slug: 'ip', title: 'IP Protection', description: 'Timestamped, tamper-proof records of intellectual property — patents, trade secrets, and creative works sealed in glass.', image: '/sectors/ip.png', icon: '🔒' },
  { slug: 'dna', title: 'DNA & Genomics', description: 'Encode entire human genomes and biological data sets into crystal — preserving the blueprint of life for billions of years.', image: '/sectors/dna.png', icon: '🧬' },
  { slug: 'cultural', title: 'Cultural Heritage', description: "Partner with museums, libraries, and archives to preserve humanity's most irreplaceable documents and artworks.", image: '/sectors/cultural.png', icon: '🏛️' },
  { slug: 'luxury', title: 'Luxury & Jewellery', description: 'Crystal as a luxury object — bespoke data jewellery, commemorative pieces, and high-end collectibles with embedded meaning.', image: '/sectors/luxury.png', icon: '💎' },
  { slug: 'crypto', title: 'Crypto & Blockchain', description: 'Cold storage for seed phrases, wallet keys, and smart contract records — offline, unhackable, and permanent.', image: '/sectors/crypto.png', icon: '₿' },
  { slug: 'personal', title: 'Personal & Family', description: 'Encode family photos, videos, and memories into a crystal keepsake — a permanent gift for generations to come.', image: '/sectors/personal.png', icon: '👨‍👩‍👧‍👦' },
];
sectors.forEach((s, i) => seedContentItem('sector', s, i));

// ── FAQ ────────────────────────────────────────────────────────────────
const faqItems = [
  { question: 'What is a 5D Memory Crystal?', answer: 'A 5D Memory Crystal is a data storage device made from pure fused quartz glass. Data is written using femtosecond laser pulses that create self-assembled nanogratings within the glass structure. The five dimensions refer to the three spatial coordinates plus the size and orientation of the nanogratings, enabling extremely high data density.', category: 'technology' },
  { question: 'How long does a 5D Memory Crystal last?', answer: 'A 5D Memory Crystal is designed to preserve data for billions of years at room temperature. It can withstand temperatures up to 1,000°C, is resistant to water, radiation, and electromagnetic pulses, making it virtually indestructible under normal conditions.', category: 'technology' },
  { question: 'How much data can a 5D Memory Crystal store?', answer: 'Current 5D Memory Crystals can store up to 360 terabytes of data in a single disc approximately the size of a coin. This capacity exceeds that of conventional storage media by orders of magnitude.', category: 'technology' },
  { question: 'How is my data secured during the encoding process?', answer: 'Your data is transferred through encrypted channels to our Swiss facility, which operates in an air-gapped environment. The encoding process takes place in a secure, climate-controlled cleanroom. After encoding, the original data files are securely destroyed from our systems.', category: 'security' },
  { question: 'Can I read the data back from the crystal?', answer: 'Yes. Data stored on 5D Memory Crystals can be read using a standard optical microscope and polariser. We provide a dedicated crystal reader device that makes data retrieval straightforward.', category: 'technology' },
  { question: 'What types of data can be stored?', answer: 'Any digital data can be stored on a 5D Memory Crystal, including documents, images, videos, databases, genomic sequences, cryptographic keys, and more. There are no restrictions on file types or formats.', category: 'storage' },
  { question: 'How do I order a 5D Memory Crystal?', answer: 'You can order directly through our website or schedule a consultation with our team. We offer different crystal sizes and service levels to match your specific storage needs. Enterprise and institutional clients can contact us for custom solutions.', category: 'ordering' },
  { question: 'Where are 5D Memory Crystals manufactured?', answer: 'All 5D Memory Crystals are manufactured in our secure facility in Switzerland, ensuring the highest quality standards and data security throughout the production process.', category: 'security' },
  { question: 'Is the technology proven?', answer: "Yes. 5D Memory Crystal technology has been developed through years of research and has been deployed on SpaceX missions in partnership with the Arch Mission Foundation. Our crystals have been sent to space as part of humanity's backup plan for preserving knowledge.", category: 'technology' },
  { question: 'What happens if the crystal is damaged?', answer: 'While 5D Memory Crystals are extremely resistant to physical damage, heat, water, and radiation, if a crystal were to be physically shattered, data from the remaining fragments could potentially still be recovered, as the data is encoded throughout the material.', category: 'storage' },
];
faqItems.forEach((f, i) => seedContentItem('faq', f, i));

// ── Process Steps ──────────────────────────────────────────────────────
const processSteps = [
  { number: 1, title: 'Secure Data Transfer', description: 'Your data is securely transferred to our Swiss facility via encrypted channels or physical media — fully air-gapped from public networks at every stage.', image: '/process/data-transfer.JPG.webp' },
  { number: 2, title: 'Certificate of Authority', description: 'Every crystal comes with a Certificate of Authenticity documenting the encoded data, encoding date, and unique crystal identifier — your proof of permanence.', image: '/process/certificate.JPG' },
  { number: 3, title: 'Data Verification', description: 'After encoding, each crystal is read back and verified bit-by-bit against the original data to guarantee perfect preservation.', image: '/process/data-verification.jpg.webp' },
  { number: 4, title: 'Read Service', description: 'We offer an on-demand data retrieval service — send us your crystal and we will extract and return your data in any format you need.', image: '/process/reading-device.JPG.webp' },
];
processSteps.forEach((p, i) => seedContentItem('process-step', p, i));

// ── Media Quotes ───────────────────────────────────────────────────────
const mediaQuotes = [
  { quote: 'Data storage that could outlast civilisation itself', source: 'WIRED' },
  { quote: 'Most durable data storage material in the world', source: 'Guinness World Records' },
  { quote: 'Groundbreaking university research project', source: 'The Telegraph' },
];
mediaQuotes.forEach((q, i) => seedContentItem('media-quote', q, i));

// ── Partner Logos (Trusted By) ─────────────────────────────────────────
const partnerLogos = [
  { name: 'MoMA', logo: '/logos/moma.svg' },
  { name: 'Astrolab', logo: '/logos/ASTROLAB.svg' },
  { name: 'Uplift', logo: '/logos/uplift.svg' },
  { name: 'GOG', logo: '/logos/gog.svg' },
  { name: 'Soundsfun', logo: '/logos/soundsfun.svg' },
  { name: 'Lifeship', logo: '/logos/lifeship.svg' },
  { name: 'Boucheron', logo: '/logos/boucheron.svg' },
];
partnerLogos.forEach((p, i) => seedContentItem('partner-logo', p, i));

// ── Comparison Table ───────────────────────────────────────────────────
const comparisonRows = [
  { feature: 'Lifespan', crystal: '13.8 Billion yrs', hdd: '5–10 years', tape: '30–50 years' },
  { feature: 'Heat Resistance', crystal: 'Up to 1,000 °C', hdd: 'Low', tape: 'Moderate' },
  { feature: 'EMP / Radiation', crystal: 'Fully resistant', hdd: 'Vulnerable', tape: 'Vulnerable' },
  { feature: 'Physical medium', crystal: 'Fused quartz glass', hdd: 'Magnetic / Silicon', tape: 'Polymer tape / Server' },
  { feature: 'Read without power', crystal: 'Yes (optical)', hdd: 'No', tape: 'No' },
  { feature: 'Ongoing energy cost', crystal: 'None', hdd: 'Continuous', tape: 'Continuous' },
  { feature: 'Cyber attack surface', crystal: 'Zero (air-gapped)', hdd: 'High', tape: 'High' },
];
comparisonRows.forEach((r, i) => seedContentItem('comparison-row', r, i));

// ── Lifespan Bars ──────────────────────────────────────────────────────
const lifespanBars = [
  { name: '5D Memory Crystal', years: '100,000,000,000,000,000,000', mobileYears: '100Q+', unit: 'YRS', highlight: true },
  { name: 'Silica Disc', years: '100,000,000', mobileYears: '100M', unit: 'YRS', highlight: false },
  { name: 'Magnetic Tape (LTO)', years: '30', mobileYears: '30', unit: 'YEARS', highlight: false },
  { name: 'SSD', years: '5-10', mobileYears: '5-10', unit: 'YEARS', highlight: false },
  { name: 'HDD', years: '3-5', mobileYears: '3-5', unit: 'YEARS', highlight: false },
];
lifespanBars.forEach((l, i) => seedContentItem('lifespan-bar', l, i));

// ═══════════════════════════════════════════════════════════════════════
// NEWS ARTICLES
// ═══════════════════════════════════════════════════════════════════════

const insertNews = db.prepare(
  `INSERT INTO NewsArticle (id, title, slug, excerpt, content, imageUrl, imageAlt, published, publishedAt, sourceName, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

const newsArticles = [
  ['Mission: Impossible — The Final Reckoning Features 360TB Crystal', 'mission-impossible-final-reckoning-360tb-crystal', 'Our 5D optical storage technology makes a surprise appearance in the latest Mission: Impossible film, showcasing 360TB silica storage media on the big screen.', '<p>Our 5D optical storage technology makes a surprise appearance in the latest Mission: Impossible film, showcasing 360TB silica storage media on the big screen. The film features a scene where the crystal is presented as a secure medium for storing classified data, highlighting the indestructible nature of fused quartz glass storage.</p>', '/news/mission-impossible.webp', 'Mission: Impossible — The Final Reckoning features 5D Memory Crystal', '2025-06-03T00:00:00.000Z', 'TechRadar Pro', 'media'],
  ['Scientists Store Entire Human Genome on Memory Crystal', 'scientists-store-entire-human-genome-memory-crystal', 'A complete human genetic sequence has been encoded into a 5D memory crystal, preserving the blueprint of life for billions of years.', '<p>A complete human genetic sequence has been encoded into a 5D memory crystal, preserving the blueprint of life for billions of years. The breakthrough, achieved in partnership with researchers at the University of Southampton, demonstrates the potential for permanent biological data storage in fused quartz glass.</p>', '/news/genome.jpg', 'Human genome encoded on 5D Memory Crystal', '2024-09-22T00:00:00.000Z', 'CNN', 'research'],
  ['European Physical Society Milestones Preserved for Eternity', 'european-physical-society-milestones-preserved', 'A nanostructured glass crystal encoding 50 years of physics milestones was created for the EPS 50th anniversary.', '<p>A nanostructured glass crystal encoding 50 years of physics milestones was created for the EPS 50th anniversary. The Institute of Physics CEO presented the European Physical Society with a 5D data crystal featuring virtually unlimited data-storage capacity with eternal longevity.</p>', '/news/eps-milestones.jpg', 'European Physical Society 5D Memory Crystal presentation', '2018-11-20T00:00:00.000Z', 'Institute of Physics', 'events'],
  ['Hawking and UDHR Exhibited at V&A Museum', 'hawking-udhr-exhibited-va-museum', "Stephen Hawking's Brief History of Time and the Universal Declaration of Human Rights were exhibited in crystal at the V&A's 'The Future Starts Here'.", '<p>Eternal copies of Stephen Hawking\'s "Brief History of Time" and the Universal Declaration of Human Rights were exhibited at the Victoria and Albert Museum\'s "The Future Starts Here" exhibition. The display showcased how 5D optical storage technology can preserve humanity\'s most important works for billions of years.</p>', '/news/va-museum.jpg', 'V&A Museum The Future Starts Here exhibition with 5D Memory Crystal', '2018-10-08T00:00:00.000Z', 'Victoria and Albert Museum', 'events'],
  ['5D Crystal Joins Tesla Roadster on SpaceX Journey', '5d-crystal-joins-tesla-roadster-spacex-journey', 'In partnership with the Arch Mission Foundation, a 5D storage crystal was included in the SpaceX Falcon Heavy payload launched into solar orbit.', '<p>In partnership with the Arch Mission Foundation, a 5D storage crystal containing the Arch Library was included aboard the Tesla Roadster on SpaceX\'s Falcon Heavy rocket, launched toward Mars orbit. The crystal will orbit the Sun for billions of years, carrying a backup of human knowledge through space.</p>', '/news/SpaceX.png', '5D Memory Crystal aboard SpaceX Falcon Heavy payload', '2018-02-18T00:00:00.000Z', 'Arch Mission Foundation', 'partnerships'],
  ['Eternal Holy Bible Gifted to the Vatican Library', 'eternal-holy-bible-gifted-vatican-library', 'The Biblioteca Apostolica Vaticana received an eternal copy of the Holy Bible, encoded in 5D crystal for permanent preservation.', '<p>An eternal copy of the Holy Bible was presented to the Biblioteca Apostolica Vaticana (Vatican Library), encoded in 5D crystal for permanent preservation. The crystal contains the complete text of the Bible inscribed using femtosecond laser technology, ensuring it will endure for billions of years.</p>', '/news/vatican-bible.jpg', 'Eternal Holy Bible on 5D Memory Crystal for Vatican Library', '2017-04-17T00:00:00.000Z', 'Vatican Library', 'partnerships'],
  ['Salisbury Cathedral Receives Magna Carta for Eternity', 'salisbury-cathedral-receives-magna-carta-eternity', 'A special glass disc copy of the Magna Carta was presented to Salisbury Cathedral, encoded in nanostructured quartz glass.', '<p>A special glass disc containing a copy of the Magna Carta was presented to Salisbury Cathedral, encoded in nanostructured quartz glass using 5D optical storage technology. The presentation marked a historic step in preserving one of the most important legal documents in history for eternity.</p>', '/collections/magna-carta.jpg', 'Magna Carta encoded on 5D Memory Crystal at Salisbury Cathedral', '2016-06-16T00:00:00.000Z', 'Salisbury Cathedral', 'events'],
  ['Eternal UDHR Presented to UNESCO', 'eternal-udhr-presented-unesco', 'An eternal copy of the Universal Declaration of Human Rights was presented at the International Year of Light closing ceremony in New Mexico.', '<p>A permanent copy of the Universal Declaration of Human Rights was presented at the International Year of Light closing ceremony in New Mexico. The crystal encodes the full text of the UDHR using 5D optical storage, ensuring this foundational human rights document endures for billions of years.</p>', '/collections/udhr.jpg', 'Universal Declaration of Human Rights on 5D Memory Crystal at UNESCO', '2016-02-06T00:00:00.000Z', 'UNESCO', 'events'],
  ['Wired Names 5D Crystal Among Eight Scientific Breakthroughs', 'wired-names-5d-crystal-eight-scientific-breakthroughs', 'Wired magazine recognised 5D optical storage as one of eight revolutionary scientific breakthroughs emerging from UK research.', '<p>Wired magazine recognised 5D optical storage technology as one of eight revolutionary scientific breakthroughs emerging from UK research. The recognition highlighted the breakthrough potential of femtosecond laser writing in fused quartz glass for permanent data storage.</p>', '/news/Human Genome.png', 'Wired magazine recognition of 5D Memory Crystal technology', '2016-10-07T00:00:00.000Z', 'Wired UK', 'media'],
];

for (const n of newsArticles) {
  insertNews.run(cuid(), n[0], n[1], n[2], n[3], n[4], n[5], 1, n[6], n[7], n[8], now, now);
}

// ═══════════════════════════════════════════════════════════════════════
// CASE STUDIES
// ═══════════════════════════════════════════════════════════════════════

const insertCaseStudy = db.prepare(
  `INSERT INTO CaseStudy (id, title, slug, client, sector, excerpt, challenge, solution, outcome, content, imageUrl, imageAlt, published, featured, publishedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

const caseStudies = [
  ['Boucheron Heritage Preservation', 'boucheron-heritage-preservation', 'Boucheron', 'luxury', 'Preserving 165 years of haute joaillerie heritage in an indestructible 5D Memory Crystal.', 'Boucheron needed to preserve their 165-year archive of designs and brand heritage.', 'Complete digital archive encoded onto a 5D Memory Crystal, preserved for billions of years.', 'Legacy permanently preserved, immune to digital degradation and cyber threats.', '<p>Boucheron entrusted their most valuable heritage data to 5D Memory Crystal technology.</p>', '/case-studies/boucheron.png', 'Boucheron Heritage Preservation', '2024-06-15T00:00:00.000Z'],
  ['GOG Digital Archive', 'gog-digital-archive', 'GOG', 'cultural', 'Preserving classic video game heritage on indestructible 5D Memory Crystals.', 'GOG needed a permanent archival solution for their library of classic video games.', 'Digital game archive encoded onto 5D Memory Crystals.', 'Classic video game heritage permanently preserved for future generations.', '<p>GOG partnered with 5D Memory Crystal to preserve gaming cultural heritage.</p>', '/case-studies/gog.png', 'GOG Digital Archive', '2024-04-20T00:00:00.000Z'],
  ['Astrolab Space Mission', 'astrolab-space-mission', 'Astrolab', 'space', 'Sending humanity knowledge to space on 5D Memory Crystals.', 'Astrolab required ultra-durable storage for space travel conditions.', 'Custom 5D Memory Crystals designed for space radiation and extreme temperatures.', 'Human knowledge preserved on the Moon as a backup of civilization.', '<p>Astrolab selected 5D Memory Crystal for lunar knowledge preservation.</p>', '/case-studies/astrolab.png', 'Astrolab Space Mission', '2024-08-10T00:00:00.000Z'],
  ['Vatican Library Preservation', 'vatican-library-preservation', 'Vatican Library', 'cultural', 'Preserving priceless manuscripts from the Vatican Apostolic Library.', 'Precious documents deteriorating despite preservation efforts.', 'Selected manuscripts encoded onto 5D Memory Crystals for eternal preservation.', 'Priceless manuscripts preserved for eternity in indestructible quartz glass.', '<p>The Vatican Library entrusted precious documents to 5D Memory Crystal technology.</p>', '/case-studies/vatican.png', 'Vatican Library Preservation', '2024-02-28T00:00:00.000Z'],
];

for (const cs of caseStudies) {
  insertCaseStudy.run(cuid(), cs[0], cs[1], cs[2], cs[3], cs[4], cs[5], cs[6], cs[7], cs[8], cs[9], cs[10], 1, 1, cs[11], now, now);
}

console.log('Database seeded successfully');
console.log('  - 1 admin user');
console.log('  - ' + benefits.length + ' benefits');
console.log('  - ' + sectors.length + ' sectors');
console.log('  - ' + faqItems.length + ' FAQ items');
console.log('  - ' + processSteps.length + ' process steps');
console.log('  - ' + mediaQuotes.length + ' media quotes');
console.log('  - ' + partnerLogos.length + ' partner logos');
console.log('  - ' + comparisonRows.length + ' comparison rows');
console.log('  - ' + lifespanBars.length + ' lifespan bars');
console.log('  - ' + newsArticles.length + ' news articles');
console.log('  - ' + caseStudies.length + ' case studies');
console.log('  - 12 page content sections');
db.close();
