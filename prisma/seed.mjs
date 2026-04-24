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
  { icon: '/icons/legal-compliance-ready.svg', title: 'Legal & Compliance Ready', description: 'Regulatory mandates require immutable, long-term records. Crystal provides tamper-proof storage that satisfies the strictest retention policies.' },
  { icon: '/icons/cyber-security.svg', title: 'Cyber Security Proofed', description: 'Fully air-gapped, offline, and immune to ransomware. No network connection means zero attack surface for your most sensitive data.' },
  { icon: '/icons/environmental-performance.svg', title: 'Environmental Performance', description: 'Data centres consume 1-2% of global electricity. Crystal requires zero energy to maintain — write once, store forever with no carbon footprint.' },
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
  { name: 'MoMA', logo: '/logos/MOMA.png' },
  { name: 'Astrolab', logo: '/logos/ASTROLAB.svg' },
  { name: 'Uplift', logo: '/logos/UPLIFT.png' },
  { name: 'GOG', logo: '/logos/GOG.png' },
  { name: 'Soundsfun', logo: '/logos/SOUNDSFUN.svg' },
  { name: 'Lifeship', logo: '/logos/LIFESHIP.png' },
  { name: 'Boucheron', logo: '/logos/BOUCHERON.png' },
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
  { name: '5D Memory Crystal', years: '100,000,000,000,000,000,000', mobileYears: '100Q+', unit: 'YEARS', highlight: true },
  { name: 'Silica Disc', years: '100,000,000', mobileYears: '100M', unit: 'YEARS', highlight: false },
  { name: 'Magnetic Tape (LTO)', years: '30', mobileYears: '30', unit: 'YEARS', highlight: false },
  { name: 'SSD', years: '5-10', mobileYears: '5-10', unit: 'YEARS', highlight: false },
  { name: 'HDD', years: '3-5', mobileYears: '3-5', unit: 'YEARS', highlight: false },
];
lifespanBars.forEach((l, i) => seedContentItem('lifespan-bar', l, i));

// ── Technology Page ───────────────────────────────────────────────────
seedPageContent('technology', 'hero', {
  eyebrow: 'Technology',
  heading: 'How 5D Optical Storage Works',
  description: 'Data is encoded using femtosecond laser pulses into fused quartz glass, creating nanoscale structures that store information across five dimensions. Founded on 30+ years of pioneering research at the University of Southampton.',
});

const techStats = [
  { value: '10', unit: 'Years', sup: '20', label: 'Data Lifespan' },
  { value: '360', unit: 'TB', sup: '', label: 'Per Disc Capacity' },
  { value: '1,000°C', unit: '', sup: '', label: 'Heat Resistance' },
  { value: '30+', unit: '', sup: '', label: 'Years of R&D' },
];
techStats.forEach((s, i) => seedContentItem('tech-stat', s, i));

const techSections = [
  { eyebrow: 'Core Technology', title: 'The Five Dimensions', description: 'Unlike conventional storage that records data in two dimensions, 5D optical storage encodes information across five separate dimensions within fused quartz glass. Three spatial dimensions (x, y, z layering) define the physical position of each data point within the crystal. Two additional optical dimensions are derived from birefringence — the slow axis orientation and retardance strength of self-assembled nanogratings — enabling vastly greater data density and permanence.', image: '/technology/5d-storage.png', imageAlt: '5D encoding diagram showing five dimensions of data storage', bullets: '' },
  { eyebrow: 'Writing Process', title: 'How Data is Written', description: 'A femtosecond laser creates self-assembled nanogratings within fused silica glass. Each pit is less than 200nm in size and stores 8 bits (one byte) of data. The ultrashort laser pulses modify the glass at the nanoscale without cracking or damaging the surrounding material, enabling precise, high-density inscription.', image: '/technology/how-data-is-written.JPG', imageAlt: 'Femtosecond laser writing process creating nanogratings in quartz glass', bullets: 'Femtosecond laser inscription\nSub-200nm nanogratings\nSelf-assembled nanostructures\nData erasable and rewritable' },
  { eyebrow: 'Sustainability', title: 'Environmental Sustainability', description: "Global data centres consume 1–2% of the world's electricity and generate significant carbon emissions. 5D crystal storage requires zero ongoing energy once data has been written. Write once, store forever — with no cooling infrastructure, no hardware refresh cycles, and no recurring energy cost. A fundamentally more sustainable approach to long-term data preservation.", image: '/technology/enviromental.png', imageAlt: 'Sustainable data storage with zero energy maintenance', bullets: 'Zero energy maintenance\nNo cooling infrastructure required\nNo hardware refresh cycles\nReduced carbon footprint vs cloud' },
];
techSections.forEach((s, i) => seedContentItem('tech-section', s, i));

seedPageContent('technology', 'cta', {
  eyebrow: 'Get Started',
  heading: 'Your First Crystal',
  description: 'Available now for early adopters. Choose a format, upload your files, and receive a crystal that will outlast everything you own.',
  cta1Text: 'Order Your Crystal',
  cta1Href: '/contact',
  cta2Text: 'See Collections',
  cta2Href: '/collections',
});

// ── Services/Sectors Page ────────────────────────────────────────────
seedPageContent('services', 'hero', {
  eyebrow: 'Sectors',
  heading: 'Storage Solutions for Every Need',
  description: 'From personal keepsakes to enterprise-grade archival, luxury goods, and blockchain verification — every service built on the same indestructible foundation.',
});

const serviceDetails = [
  { slug: 'space-tech', eyebrow: 'Space Tech', title: 'Built for the Final Frontier', description: 'The 5D Memory Crystal is engineered to withstand the vacuum, intense radiation, and extreme temperature extremes of space without degradation. Whether aboard satellites, deep-space probes, or lunar installations, crystal storage ensures mission-critical data survives where no conventional medium can.', image: '/sectors/Space.png', imageAlt: 'Space technology grade crystal data storage', bullets: 'Radiation-resistant and vacuum-stable\nSurvives extreme temperature swings\nIdeal for satellites and deep-space missions\nNo power required for data retention' },
  { slug: 'corporate', eyebrow: 'Corporate & Legal', title: 'Immutable Business Records', description: 'Regulatory archives, board resolutions, IP filings, and compliance records that must remain unalterable and retrievable indefinitely. Crystal storage meets the most demanding data retention policies — providing tamper-proof, offline records that satisfy auditors and regulators without ongoing infrastructure cost.', image: '/sectors/corporate.png', imageAlt: 'Corporate data archival and legal compliance records', bullets: 'Regulatory and compliance archival\nTamper-proof audit trail\nZero ongoing infrastructure cost\nAir-gapped — immune to cyber attacks' },
  { slug: 'ip', eyebrow: 'IP Protection', title: "Proof That Can't Be Altered", description: 'Timestamped, tamper-proof records of intellectual property — patents, trade secrets, source code, and creative works sealed in glass. Crystal provides irrefutable proof of existence at a specific point in time, creating a permanent record that stands up in any jurisdiction and cannot be backdated, altered, or destroyed.', image: '/sectors/ip.png', imageAlt: 'Intellectual property protection and timestamping', bullets: 'Tamper-proof timestamp of creation\nPatents, trade secrets, and source code\nAdmissible as evidence in legal proceedings\nCannot be backdated or altered' },
  { slug: 'dna', eyebrow: 'DNA & Genomics', title: 'The Blueprint of Life, Preserved', description: 'Encode entire human genomes and biological data sets into crystal — preserving the blueprint of life for billions of years. In partnership with LifeShip, we offer a permanent record of your genetic identity. From personal genome preservation to large-scale research archives, crystal ensures biological data outlasts every conventional storage medium.', image: '/sectors/dna.png', imageAlt: 'DNA and genomic data encoded into 5D memory crystal', bullets: 'Complete human genome storage\nResearch dataset archival\nPartnership with LifeShip\nBillion-year data integrity guarantee' },
  { slug: 'cultural', eyebrow: 'Cultural Heritage', title: 'Preserving Civilisation', description: "Partner with museums, libraries, national archives, and UNESCO sites to preserve humanity's most irreplaceable documents and artworks. From the Magna Carta to the Universal Declaration of Human Rights, we've encoded some of the world's most significant cultural artefacts into 5D crystal — ensuring they survive for billions of years.", image: '/sectors/cultural.png', imageAlt: 'Cultural heritage preservation with 5D crystal technology', bullets: 'UNESCO and national archive partnerships\nMagna Carta and UDHR already encoded\nMuseum-grade presentation cases\nFull provenance and Certificate of Authority' },
  { slug: 'luxury', eyebrow: 'Luxury & Jewellery', title: 'Data as a Luxury Object', description: 'Crystal as a luxury object in its own right — bespoke data jewellery that encodes personal meaning into wearable, permanent form. Commemorative and collectible pieces combine artistry with embedded data, creating unique objects that tell a story visible only under specialised readers. Ideal for high-net-worth individuals, luxury brands, and special occasions.', image: '/sectors/luxury.png', imageAlt: 'Luxury crystal jewellery with encoded data', bullets: 'Bespoke crystal jewellery and pendants\nLuxury brand collaboration pieces\nCommemorative and limited editions\nEmbedded authentication data' },
  { slug: 'crypto', eyebrow: 'Crypto & Blockchain', title: 'The Ultimate Cold Storage', description: 'Seed phrases, wallet keys, and smart contract records inscribed into glass that is offline, unhackable, and indestructible. No battery, no firmware, no single point of failure. For the crypto community, crystal offers cold storage that genuinely cannot be compromised — immune to fire, flood, EMP, and the passage of time.', image: '/sectors/crypto.png', imageAlt: 'Cryptocurrency cold storage in 5D crystal', bullets: 'Seed phrase and private key inscription\nImmune to fire, flood, and EMP\nNo battery or firmware dependency\nTamper-evident delivery and packaging' },
  { slug: 'personal', eyebrow: 'Personal & Family', title: 'Memories That Last Forever', description: "Family photos, wedding videos, letters, and personal milestones encoded into a crystal keepsake — a permanent gift that outlasts every hard drive, cloud account, and social media platform. Whether it's a first birthday or a lifetime archive, your memories are preserved beyond the reach of data loss, format obsolescence, or digital decay.", image: '/sectors/personal.png', imageAlt: 'Personal family memories preserved in 5D crystal', bullets: 'Photos, videos, documents, and audio files\nPresentation case included as standard\nPerfect as a gift or heirloom\nNo subscription or maintenance required' },
];
serviceDetails.forEach((s, i) => seedContentItem('service-detail', s, i));

seedPageContent('services', 'problems', {
  eyebrow: 'Why Choose Us?',
  heading: 'The Problems We Solve',
  description: 'Every reason organisations and individuals turn to permanent storage.',
});

const problems = [
  { title: 'Data Loss', description: 'Hard drives fail. Cloud providers shut down. 5D crystal removes the risk of losing irreplaceable digital assets forever.', icon: '/icons/no-data-loss.svg' },
  { title: 'Loss of Access', description: 'Format obsolescence, account lockouts, service discontinuation — crystal data is readable with basic optics, no subscription needed.', icon: '/icons/no-access-loss.svg' },
  { title: 'Legal & Compliance', description: 'Regulatory mandates require immutable, long-term records. Crystal provides tamper-proof storage that satisfies the strictest policies.', icon: '/icons/legal-compliance-ready.svg' },
  { title: 'Cyber Security', description: 'Fully air-gapped, offline, and immune to ransomware. No network connection means zero attack surface.', icon: '/icons/cyber-security.svg' },
  { title: 'Environmental Performance', description: 'Data centres consume 1–2% of global electricity. Crystal requires zero energy to maintain — write once, store forever.', icon: '/icons/environmental-performance.svg' },
  { title: 'Backup & Redundancy', description: 'The ultimate last line of defence. Crystal backup survives fires, floods, and EMP that would destroy any conventional copy.', icon: '/icons/Ultimate Backup.svg' },
];
problems.forEach((p, i) => seedContentItem('problem', p, i));

seedPageContent('services', 'how-it-works', {
  eyebrow: 'Process',
  heading: 'How It Works',
  description: 'Four simple steps from upload to eternity.',
});

const servicesProcessSteps = [
  { number: 1, title: 'Choose Your Format', description: 'Select crystal size and storage capacity based on your needs.' },
  { number: 2, title: 'Upload Your Data', description: 'Securely transfer files through our encrypted upload portal.' },
  { number: 3, title: 'We Encode', description: 'Femtosecond laser writes your data into fused quartz glass.' },
  { number: 4, title: 'Receive Your Crystal', description: 'Your permanent archive, delivered in a presentation case.' },
];
servicesProcessSteps.forEach((s, i) => seedContentItem('services-process-step', s, i));

seedPageContent('services', 'cta', {
  eyebrow: 'Get Started',
  heading: 'Ready to Preserve Your Data?',
  description: 'Choose your crystal format today and create a permanent record that will outlast every other storage medium on Earth.',
  cta1Text: 'Order Your Crystal',
  cta1Href: '/contact',
  cta2Text: 'Schedule Demo',
  cta2Href: '/schedule-demo',
});

// ── Trust & Process Page ─────────────────────────────────────────────
seedPageContent('process', 'hero', {
  eyebrow: 'Trust & Process',
  heading: 'Trust & Process',
  description: 'From the moment you hand over your data to the moment you read it back — every step is designed for security, transparency, and confidence.',
});

seedPageContent('process', 'pillars', {
  eyebrow: 'The Process',
  heading: 'Four Pillars of Trust',
  description: 'Each crystal goes through a rigorous, auditable process — so you never have to wonder.',
});

const trustPillars = [
  { number: 1, title: 'Secure Transfer', summary: 'Encrypted upload or air-gapped physical handover.' },
  { number: 2, title: 'Certificate', summary: 'Formal proof of exactly what data is in your crystal.' },
  { number: 3, title: 'Verification', summary: 'Bit-for-bit integrity check after encoding.' },
  { number: 4, title: 'Read Service', summary: 'On-demand data retrieval from your crystal.' },
];
trustPillars.forEach((p, i) => seedContentItem('trust-pillar', p, i));

const trustSteps = [
  { step: 1, id: 'secure-transfer', title: 'Secure Data Transfer', description: "Your data is the most valuable thing you'll entrust to us — so we treat the transfer with the same level of security as the crystal itself. Whether you upload through our encrypted portal or ship physical media directly, your files are handled in an air-gapped environment from the moment they arrive.", image: '/process/data-transfer.JPG.webp', imageAlt: 'Encrypted upload and secure data transfer process', bullets: 'End-to-end encrypted file upload portal\nPhysical media shipping option for sensitive data\nAir-gapped receiving environment — no internet exposure\nData securely erased from all transfer media after encoding' },
  { step: 2, id: 'certificate', title: 'Certificate of Authority', description: 'Every crystal comes with a formal Certificate of Authority — a documented record of exactly what data has been encoded, when it was written, and by whom. This is your proof of provenance: an auditable, tamper-evident record that travels with the crystal for its entire lifespan.', image: '/process/certificate.JPG', imageAlt: 'Certificate of Authority document for 5D Memory Crystal', bullets: 'Itemised manifest of all encoded files and data sets\nTimestamped encoding record with unique crystal identifier\nCryptographic hash of the source data for independent verification\nPhysical and digital certificate formats available' },
  { step: 3, id: 'verification', title: 'Data Verification', description: 'After encoding, the crystal is immediately read back and the retrieved data is compared against the original — bit for bit. This verification step confirms that the data stored in the crystal is complete, accurate, and exactly as it should be. Nothing is shipped until verification passes.', image: '/process/data-verification.jpg.webp', imageAlt: 'Data verification and quality check process', bullets: 'Full read-back after every encoding session\nBit-for-bit comparison against source data\nVerification report included with your Certificate of Authority\nFailed verifications trigger automatic re-encoding' },
  { step: 4, id: 'read-service', title: 'Read Service', description: 'Your data is encoded for eternity — but you may need to access it today. Our read service uses precision optical equipment to retrieve the data stored in your crystal and deliver it back to you in any standard digital format. Available on demand, as many times as you need.', image: '/process/reading-device.JPG.webp', imageAlt: 'Crystal reader and optical data retrieval equipment', bullets: 'On-demand data retrieval from any 5D Memory Crystal\nOutput delivered in standard digital formats\nSecure return shipping and handling\nFuture-proofed — visual decoding instructions encoded on the crystal itself' },
];
trustSteps.forEach((s, i) => seedContentItem('trust-step', s, i));

// ── Gallery (case studies page) ──────────────────────────────────────
const caseStudiesGallery = [
  { title: 'Universal Declaration of Human Rights', subtitle: 'UNESCO, 2016', tag: 'Cultural Heritage', image: '/collections/udhr.jpg', imageAlt: 'Universal Declaration of Human Rights crystal' },
  { title: 'Holy Bible', subtitle: 'Biblioteca Apostolica Vaticana', tag: 'Cultural Heritage', image: '/case-studies/vatican.png', imageAlt: 'Holy Bible crystal preserved at the Vatican Library' },
  { title: "Stephen Hawking's Brief History of Time", subtitle: 'V&A Museum, London', tag: 'Scientific', image: '/case-studies/brief-history-of-time.png', imageAlt: "Stephen Hawking's Brief History of Time crystal" },
  { title: "Isaac Newton's Opticks", subtitle: 'Classical physics preserved', tag: 'Scientific', image: '/collections/newton-opticks.jpg', imageAlt: "Isaac Newton's Opticks crystal" },
  { title: 'Isaac Asimov Collection', subtitle: 'Complete works encoded', tag: 'Art', image: '/case-studies/asimov-3.avif', imageAlt: 'Isaac Asimov collection crystal' },
  { title: 'Human Genome', subtitle: 'Complete DNA sequence, 2024', tag: 'DNA', image: '/case-studies/human-genome-collection2.png', imageAlt: 'Human Genome crystal collection' },
  { title: 'SpaceX Falcon Heavy Payload', subtitle: 'Tesla Roadster in space, 2018', tag: 'Scientific', image: '/collections/asimov-closeup.jpg', imageAlt: 'SpaceX Falcon Heavy payload crystal' },
  { title: 'Moon Mars Museum', subtitle: 'Lunar archive of humanity', tag: 'Cultural Heritage', image: '/case-studies/moon-mars-museum.webp', imageAlt: 'Moon Mars Museum lunar archive crystal' },
  { title: "The Hitchhiker's Guide to the Galaxy", subtitle: 'Douglas Adams', tag: 'Art', image: '/case-studies/douglas-adams.png', imageAlt: "The Hitchhiker's Guide to the Galaxy crystal" },
];
caseStudiesGallery.forEach((g, i) => seedContentItem('gallery', g, i));

seedPageContent('process', 'continuous-improvement', {
  eyebrow: 'Looking Ahead',
  heading: 'Continuous Improvement',
  subheading: 'More Trust Services Coming',
  description: 'We are continuously developing new services to increase your confidence in our process and product — from expanded verification options to long-term custodial services. This page will grow as we do.',
});

seedPageContent('process', 'cta', {
  eyebrow: 'Get Started',
  heading: 'Ready to Preserve Your Data?',
  description: 'Get in touch to discuss your requirements or schedule a demo of our secure encoding process.',
  cta1Text: 'Schedule Demo',
  cta1Href: '/schedule-demo',
  cta2Text: 'Contact Us',
  cta2Href: '/contact',
});

// ── About Page ───────────────────────────────────────────────────────
seedPageContent('about', 'hero', {
  eyebrow: 'About Us',
  heading: 'Preserving What Matters',
  description: 'Over 30 years of pioneering research, one mission — make ultra-long-life data storage commercially available to the world.',
});

seedPageContent('about', 'story', {
  eyebrow: 'Our Story',
  heading: 'From Lab to Legacy',
  paragraph1: '5D Memory Crystal technology was pioneered by Prof. Peter Kazansky, a world-leading scientist whose decades of research at the University of Southampton transformed our understanding of light–matter interaction at the nanoscale.',
  paragraph2: 'Today, led by technology entrepreneur Ilya Kazansky, our team of scientists, engineers and product specialists combines optical nano-technology with advances in machine learning and AI to deliver the most durable storage medium ever created — manufactured in Switzerland to the highest standards.',
  image: '/images/swiss-facility.png',
  imageAlt: '5D Memory Crystal Swiss manufacturing facility',
});

seedPageContent('about', 'values', {
  eyebrow: 'What Drives Us',
  heading: 'Our Values',
});

const values = [
  { title: 'Permanence', description: 'We build for timescales measured in billions of years. Every decision — from material selection to encoding method — is optimised for absolute longevity.' },
  { title: 'Security', description: 'Your data is handled in air-gapped Swiss facilities with full chain of custody. No third-party access, no internet exposure, tamper-evident delivery.' },
  { title: 'Precision', description: 'Femtosecond laser pulses write data at the nanoscale with bit-for-bit verification. Swiss-made engineering ensures consistent quality across every crystal.' },
  { title: 'Sustainability', description: 'Once written, a 5D Crystal requires zero energy to maintain. No cooling, no migration, no cloud infrastructure — the greenest archival medium in existence.' },
];
values.forEach((v, i) => seedContentItem('value', v, i));

seedPageContent('about', 'milestones', {
  eyebrow: 'Our Journey',
  heading: 'Key Milestones',
});

const milestones = [
  { year: '1999', title: 'Research Begins', description: 'Prof. Peter Kazansky begins pioneering research into femtosecond laser nanostructuring of fused quartz at the University of Southampton.' },
  { year: '2013', title: 'Guinness World Record', description: 'The 5D optical storage method achieves the Guinness World Record for the most durable digital storage medium.' },
  { year: '2016', title: 'Cultural Firsts', description: 'The Magna Carta and Universal Declaration of Human Rights are encoded into 5D Memory Crystal for permanent preservation.' },
  { year: '2018', title: 'Into Space', description: 'A 5D Memory Crystal is launched aboard the SpaceX Falcon Heavy, becoming the first permanent data storage in orbit.' },
  { year: '2024', title: 'Human Genome Preserved', description: 'The complete human genome is encoded into a single 5D Memory Crystal, a landmark in biological data preservation.' },
  { year: '2025', title: 'Commercially Available', description: '5D Memory Crystal becomes commercially available for early adopters — organisations and individuals seeking eternal data preservation.' },
];
milestones.forEach((m, i) => seedContentItem('milestone', m, i));

const aboutStats = [
  { stat: '30+', label: 'Years of Research' },
  { stat: '360 TB', label: 'Max Capacity per Crystal' },
  { stat: '13.8B', label: 'Years Lifespan' },
  { stat: '1,000°C', label: 'Heat Resistance' },
];
aboutStats.forEach((s, i) => seedContentItem('about-stat', s, i));

seedPageContent('about', 'cta', {
  eyebrow: 'Get Started',
  heading: 'Preserve What Matters Most',
  description: "Whether you're an institution, a researcher, or an individual — we're here to help you store your most valuable data for eternity.",
  cta1Text: 'Schedule a Demo',
  cta1Href: '/schedule-demo',
  cta2Text: 'Contact Us',
  cta2Href: '/contact',
});

// ── Collections Page ─────────────────────────────────────────────────
seedPageContent('collections', 'hero', {
  eyebrow: 'Collections',
  heading: "What We've Preserved",
  description: 'From the Magna Carta to complete human genomes — explore the works and data sets encoded into 5D Memory Crystal.',
});

seedPageContent('collections', 'gallery', {
  eyebrow: 'Featured Works',
  heading: 'Gallery',
  description: 'A curated selection of crystals produced for institutions, researchers, and private clients worldwide.',
});

const galleryItems = [
  { title: 'Magna Carta', subtitle: 'Salisbury Cathedral, 2016', tag: 'Cultural Heritage', image: '/collections/magna-carta.jpg' },
  { title: 'Universal Declaration of Human Rights', subtitle: 'UNESCO, 2016', tag: 'Cultural Heritage', image: '/collections/udhr.jpg' },
  { title: 'Holy Bible', subtitle: 'Biblioteca Apostolica Vaticana', tag: 'Cultural Heritage', image: '/collections/udhr-colour.jpg' },
  { title: "Stephen Hawking's Brief History of Time", subtitle: 'V&A Museum, London', tag: 'Scientific', image: '/collections/asimov-1.jpg' },
  { title: "Isaac Newton's Opticks", subtitle: 'Classical physics preserved', tag: 'Scientific', image: '/collections/newton-opticks.jpg' },
  { title: 'Isaac Asimov Collection', subtitle: 'Complete works encoded', tag: 'Art', image: '/collections/asimov-2.jpg' },
  { title: 'Human Genome', subtitle: 'Complete DNA sequence, 2024', tag: 'DNA', image: '/collections/asimov-3.jpg' },
  { title: 'SpaceX Falcon Heavy Payload', subtitle: 'Tesla Roadster in space, 2018', tag: 'Scientific', image: '/collections/asimov-closeup.jpg' },
  { title: 'European Physical Society Milestones', subtitle: '50th anniversary, 2018', tag: 'Scientific', image: '/collections/asimov-detail.jpg' },
];
galleryItems.forEach((g, i) => seedContentItem('gallery-item', g, i));

seedPageContent('collections', 'categories', {
  eyebrow: 'Categories',
  heading: 'Browse by Collection',
});

const collectionCategories = [
  { name: 'Personal Archives', slug: 'personal-archives', description: 'Family photos, videos, letters, and memories encoded as permanent keepsakes.', image: '/collections/personal-archives.png' },
  { name: 'Eternal Art', slug: 'eternal-art', description: 'Artworks, rare media, and creative works preserved beyond the life of any medium.', image: '/collections/eternal-art.png' },
  { name: 'Time Capsules', slug: 'time-capsules', description: 'Messages and artefacts sealed for future generations to discover.', image: '/collections/time-capsules.png' },
  { name: 'Documents & Archives', slug: 'documents-archives', description: 'Legal records, research data, and institutional archives made permanent.', image: '/collections/documents.png' },
  { name: 'DNA & Genomics', slug: 'dna-genomics', description: 'Complete genomes and biological datasets preserved for billions of years.', image: '/collections/archives.png' },
  { name: 'Luxury & Commemorative', slug: 'luxury-commemorative', description: 'Bespoke crystal jewellery and high-end collectibles with embedded data.', image: '/collections/printed-doc.png' },
];
collectionCategories.forEach((c, i) => seedContentItem('collection-category', c, i));

seedPageContent('collections', 'cta', {
  eyebrow: 'Custom Orders',
  heading: 'Commission a Custom Crystal',
  description: 'Have something unique to preserve? Work with our team to encode your data into a bespoke 5D Memory Crystal.',
  cta1Text: 'Contact Us',
  cta1Href: '/contact',
  cta2Text: 'See Pricing',
  cta2Href: '/contact',
});

// ── Trust & Security Page ────────────────────────────────────────────
seedPageContent('trust', 'hero', {
  eyebrow: 'Security & Provenance',
  heading: 'Trust & Security',
  description: 'Swiss-made, space-proven. Your data is handled with the highest security standards from transfer to delivery.',
});

seedPageContent('trust', 'swiss-manufacturing', {
  heading: 'Swiss Manufacturing',
  description: "Precision engineering under the world's strictest quality and data protection laws.",
  bodyText: "Every 5D Memory Crystal is manufactured in our dedicated facility in Switzerland. The Swiss legal framework provides some of the strongest data privacy protections in the world, and our facility operates under strict physical and digital security protocols. From raw fused quartz to finished crystal, the entire manufacturing chain takes place in one location, eliminating third-party handling risks.",
  feature1Title: 'Single-Site Production',
  feature1Desc: 'All processes from encoding to packaging under one roof.',
  feature2Title: '24/7 Surveillance',
  feature2Desc: 'Round-the-clock monitoring with biometric access control.',
});

seedPageContent('trust', 'security', {
  heading: 'Security Measures',
  description: 'Multi-layered protection for your most valuable data.',
});

const securityMeasures = [
  { title: 'Air-Gapped Encoding', description: 'Our encoding systems are completely isolated from external networks. No internet connection touches the machines that write your data, eliminating the risk of remote intrusion.' },
  { title: 'Encrypted Data Transfer', description: 'All data submitted for encoding is transferred via end-to-end encryption. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit.' },
  { title: 'Secure Destruction', description: 'After successful encoding and verification, all source files and temporary copies are securely destroyed from our systems using certified data wiping protocols.' },
  { title: 'Cleanroom Manufacturing', description: 'Crystals are encoded in a Class-100 cleanroom environment with strict access controls, environmental monitoring, and contamination prevention.' },
  { title: 'Tamper-Evident Packaging', description: 'Every crystal ships in tamper-evident, security-sealed packaging with a unique serial number for authenticity verification.' },
  { title: 'Chain of Custody', description: 'We maintain a complete chain-of-custody log from the moment your data arrives until your crystal is delivered, with full audit trail.' },
];
securityMeasures.forEach((s, i) => seedContentItem('security-measure', s, i));

seedPageContent('trust', 'certifications', {
  heading: 'Certifications',
  description: 'Independently verified standards of quality and security.',
});

const certifications = [
  { name: 'ISO 27001', description: 'Information security management system certification ensuring rigorous data protection controls.' },
  { name: 'ISO 9001', description: 'Quality management system certification guaranteeing consistent manufacturing excellence.' },
  { name: 'Swiss Made', description: 'All crystals are manufactured in Switzerland under the strictest quality and privacy laws in the world.' },
  { name: 'GDPR Compliant', description: 'Full compliance with the European General Data Protection Regulation for handling client data.' },
];
certifications.forEach((c, i) => seedContentItem('certification', c, i));

seedPageContent('trust', 'partnerships', {
  heading: 'Partnerships',
  description: 'Trusted by leading research institutions and space agencies.',
});

const partnerships = [
  { name: 'University of Southampton', description: 'Foundational research partnership with the Optoelectronics Research Centre, where 5D optical storage was invented.' },
  { name: 'Arch Mission Foundation', description: "Collaboration to deploy 5D Memory Crystals on SpaceX missions as part of preserving human knowledge beyond Earth." },
  { name: 'European Space Agency', description: 'Working with ESA on data permanence solutions for long-duration space missions and deep-space probes.' },
];
partnerships.forEach((p, i) => seedContentItem('partnership', p, i));

// ── Contact Page ─────────────────────────────────────────────────────
seedPageContent('contact', 'hero', {
  heading: 'Contact Us',
  description: 'Have a question, need a quote, or want to learn more? We would love to hear from you.',
});

seedPageContent('contact', 'info', {
  infoHeading: 'Get in Touch',
  email: 'info@5dmemorycrystal.com',
  companyName: 'SPhotonix Inc',
  location: 'Suite 208, 254 Chapman Rd, Newark, DE 19702, United States',
  businessHours: 'Monday – Friday: 9:00 – 18:00 ET',
  responseTime: 'We typically respond within one business day.',
});

// ── Order Page ───────────────────────────────────────────────────────
seedPageContent('order', 'hero', {
  heading: 'Order Now',
  description: 'Choose the crystal that fits your needs. All crystals are manufactured in Switzerland and include a certificate of authenticity.',
});

const orderProducts = [
  { name: 'Nano Crystal', capacity: 'Up to 5 GB', price: 'From CHF 149', description: 'Ideal for personal messages, photos, and small keepsakes. A meaningful gift that lasts forever.', features: 'Personal data encoding\nGift-ready presentation box\nCertificate of authenticity\nStandard delivery', popular: false, ctaText: 'Order Now', ctaHref: '/schedule-demo' },
  { name: 'Standard Crystal', capacity: 'Up to 100 GB', price: 'From CHF 499', description: 'Our most popular option for families and professionals. Stores documents, photo libraries, and important records.', features: 'Priority data encoding\nPremium presentation case\nCertificate of authenticity\nVerification QR code\nExpress delivery available', popular: true, ctaText: 'Order Now', ctaHref: '/schedule-demo' },
  { name: 'Archive Crystal', capacity: 'Up to 360 TB', price: 'Custom Pricing', description: 'Enterprise-grade storage for institutions, governments, and large organisations requiring maximum capacity.', features: 'Dedicated encoding pipeline\nAir-gapped facility processing\nFull chain-of-custody documentation\nCustom packaging and branding\nSecure courier delivery\nDedicated account manager', popular: false, ctaText: 'Contact Sales', ctaHref: '/schedule-demo' },
];
orderProducts.forEach((p, i) => seedContentItem('product', p, i));

seedPageContent('order', 'custom', {
  heading: 'Need a Custom Solution?',
  description: 'For bespoke crystal configurations, bulk orders, or specialised encoding requirements, our team is ready to help.',
  emailNote: 'Email us at info@5dmemorycrystal.com or schedule a consultation.',
  cta1Text: 'Schedule a Consultation',
  cta1Href: '/schedule-demo',
  cta2Text: 'Contact Us',
  cta2Href: '/contact',
});

// ── Schedule Demo Page ───────────────────────────────────────────────
seedPageContent('schedule-demo', 'hero', {
  heading: 'Schedule a Demo',
  description: 'See 5D Memory Crystal technology in action. Book a personalised demonstration with our team.',
});

// ── News Listing Page ────────────────────────────────────────────────
seedPageContent('news-page', 'hero', {
  eyebrow: 'Press & Media',
  heading: 'News & Updates',
  description: 'The latest from 5D Memory Crystal — product updates, partnerships, and media coverage.',
});

seedPageContent('news-page', 'newsletter-cta', {
  heading: 'Stay in the Loop',
  description: 'Be the first to hear about new products, partnerships, and breakthroughs in eternal data storage.',
  cta1Text: 'Subscribe',
  cta1Href: '/contact',
  cta2Text: 'Contact Us',
  cta2Href: '/contact',
});

// ── Case Studies Listing Page ────────────────────────────────────────
seedPageContent('case-studies-page', 'hero', {
  eyebrow: 'Real-World Applications',
  heading: 'Case Studies',
  description: 'From space missions to cultural institutions — see who is preserving their most critical data with us.',
});

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
  ['UpLift: Intact data storage of Stories of Space for moon mission', 'uplift-moon-mission', 'UpLift', 'space', 'Over 3,000+ messages from Moon Mission students and partner organisations preserved for a lunar landing as part of Astrobotic\u2019s Griffin Mission One.', 'UpLift needed a secure, non-destructible data storage medium that was small enough and could withstand the pressures and atmospheric conditions of a rocket launch, orbit and lunar landing for their participation in AstroLab\u2019s FLEX Lunar Innovation Platform as part of Astrobotic\u2019s Griffin Mission One, launching July 2026.', 'Working with SPhotonix and having seen how 5D Memory Crystal\u2122 technology worked for previous missions, UpLift brought together over 3,000+ messages from Moon Mission students and from the Institute of Noetic Sciences, Global Consciousness Project 2.0, and Space for Humanity. The data size was assessed alongside the space allowed on the FLIP.', 'A 2.5 cm diameter, 2 mm thickness round 5D Memory Crystal\u2122 was selected to hold up to 1GB of text and images using single-layer writing visible under the microscope. The crystal was delivered five months in advance of the intended launch date.', '<p>UpLift selected 5D Memory Crystal\u2122 technology to preserve Stories of Space for Astrobotic\u2019s Griffin Mission One lunar landing, launching July 2026.</p>', '/case-studies/astrolab2.jpg', 'UpLift Stories of Space 5D Memory Crystal for Griffin Mission One lunar landing', '2026-01-15T00:00:00.000Z'],
  ['Human Genome Preservation', 'human-genome-preservation', 'Human Genome Project', 'dna', 'Preserving the complete human genome on indestructible 5D Memory Crystal.', 'The complete human genetic sequence needs a permanent, incorruptible storage medium.', 'Entire human genome encoded onto a single 5D Memory Crystal using femtosecond laser technology.', 'The blueprint of human life preserved for billions of years in fused quartz glass.', '', '/case-studies/dna_disc.jpg', 'Human Genome Preservation', '2024-02-28T00:00:00.000Z'],
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
