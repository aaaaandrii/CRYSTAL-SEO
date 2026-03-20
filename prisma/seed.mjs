import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes, createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'dev.db');

// Use better-sqlite3 directly to avoid Prisma client ESM issues in seed
const db = (await import('better-sqlite3')).default(dbPath);

function cuid() {
  return 'c' + randomBytes(12).toString('hex');
}

const now = new Date().toISOString();

// Clear existing tables
db.exec('DELETE FROM NewsArticle');
db.exec('DELETE FROM CaseStudy');
db.exec('DELETE FROM User');
db.exec('DELETE FROM PageContent');
db.exec('DELETE FROM ContentItem');

// ── Seed admin user ──────────────────────────────────────────────────
// Default admin: admin@5dmemorycrystal.com / admin123
// Using bcryptjs hash for "admin123"
const adminHash = '$2b$10$RViHgf/stpI4rOY7dmDCIedkjBq4rG2aNhalrerEe.R1tJ.QEJw/i';
db.prepare(`INSERT INTO User (id, email, name, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`)
  .run(cuid(), 'admin@5dmemorycrystal.com', 'Admin', adminHash, 'admin', now, now);

const insertCaseStudy = db.prepare(`
  INSERT INTO CaseStudy (id, title, slug, client, sector, excerpt, challenge, solution, outcome, content, imageUrl, imageAlt, published, featured, publishedAt, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const caseStudies = [
  ['Boucheron Heritage Preservation', 'boucheron-heritage-preservation', 'Boucheron', 'luxury', 'Preserving 165 years of haute joaillerie heritage in an indestructible 5D Memory Crystal.', 'Boucheron needed to preserve their 165-year archive of designs and brand heritage.', 'Complete digital archive encoded onto a 5D Memory Crystal, preserved for billions of years.', 'Legacy permanently preserved, immune to digital degradation and cyber threats.', '<p>Boucheron entrusted their most valuable heritage data to 5D Memory Crystal technology.</p>', '/case-studies/boucheron.png', 'Boucheron Heritage Preservation', '2024-06-15T00:00:00.000Z'],
  ['GOG Digital Archive', 'gog-digital-archive', 'GOG', 'cultural', 'Preserving classic video game heritage on indestructible 5D Memory Crystals.', 'GOG needed a permanent archival solution for their library of classic video games.', 'Digital game archive encoded onto 5D Memory Crystals.', 'Classic video game heritage permanently preserved for future generations.', '<p>GOG partnered with 5D Memory Crystal to preserve gaming cultural heritage.</p>', '/case-studies/gog.png', 'GOG Digital Archive', '2024-04-20T00:00:00.000Z'],
  ['Astrolab Space Mission', 'astrolab-space-mission', 'Astrolab', 'space', 'Sending humanity knowledge to space on 5D Memory Crystals.', 'Astrolab required ultra-durable storage for space travel conditions.', 'Custom 5D Memory Crystals designed for space radiation and extreme temperatures.', 'Human knowledge preserved on the Moon as a backup of civilization.', '<p>Astrolab selected 5D Memory Crystal for lunar knowledge preservation.</p>', '/case-studies/astrolab.png', 'Astrolab Space Mission', '2024-08-10T00:00:00.000Z'],
  ['Vatican Library Preservation', 'vatican-library-preservation', 'Vatican Library', 'cultural', 'Preserving priceless manuscripts from the Vatican Apostolic Library.', 'Precious documents deteriorating despite preservation efforts.', 'Selected manuscripts encoded onto 5D Memory Crystals for eternal preservation.', 'Priceless manuscripts preserved for eternity in indestructible quartz glass.', '<p>The Vatican Library entrusted precious documents to 5D Memory Crystal technology.</p>', '/case-studies/vatican.png', 'Vatican Library Preservation', '2024-02-28T00:00:00.000Z'],
];

for (const cs of caseStudies) {
  insertCaseStudy.run(cuid(), cs[0], cs[1], cs[2], cs[3], cs[4], cs[5], cs[6], cs[7], cs[8], cs[9], cs[10], 1, 1, cs[11], now, now);
}

const insertNews = db.prepare(`
  INSERT INTO NewsArticle (id, title, slug, excerpt, content, imageUrl, imageAlt, published, publishedAt, sourceName, tags, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const newsArticles = [
  [
    'Mission: Impossible — The Final Reckoning Features 360TB Crystal',
    'mission-impossible-final-reckoning-360tb-crystal',
    'Our 5D optical storage technology makes a surprise appearance in the latest Mission: Impossible film, showcasing 360TB silica storage media on the big screen.',
    '<p>Our 5D optical storage technology makes a surprise appearance in the latest Mission: Impossible film, showcasing 360TB silica storage media on the big screen. The film features a scene where the crystal is presented as a secure medium for storing classified data, highlighting the indestructible nature of fused quartz glass storage.</p>',
    '/news/mission-impossible.webp',
    'Mission: Impossible — The Final Reckoning features 5D Memory Crystal',
    '2025-06-03T00:00:00.000Z',
    'TechRadar Pro',
    'media',
  ],
  [
    'Scientists Store Entire Human Genome on Memory Crystal',
    'scientists-store-entire-human-genome-memory-crystal',
    'A complete human genetic sequence has been encoded into a 5D memory crystal, preserving the blueprint of life for billions of years.',
    '<p>A complete human genetic sequence has been encoded into a 5D memory crystal, preserving the blueprint of life for billions of years. The breakthrough, achieved in partnership with researchers at the University of Southampton, demonstrates the potential for permanent biological data storage in fused quartz glass.</p>',
    '/news/genome.jpg',
    'Human genome encoded on 5D Memory Crystal',
    '2024-09-22T00:00:00.000Z',
    'CNN',
    'research',
  ],
  [
    'European Physical Society Milestones Preserved for Eternity',
    'european-physical-society-milestones-preserved',
    'A nanostructured glass crystal encoding 50 years of physics milestones was created for the EPS 50th anniversary.',
    '<p>A nanostructured glass crystal encoding 50 years of physics milestones was created for the EPS 50th anniversary. The Institute of Physics CEO presented the European Physical Society with a 5D data crystal featuring virtually unlimited data-storage capacity with eternal longevity.</p>',
    '/news/eps-milestones.jpg',
    'European Physical Society 5D Memory Crystal presentation',
    '2018-11-20T00:00:00.000Z',
    'Institute of Physics',
    'events',
  ],
  [
    'Hawking and UDHR Exhibited at V&A Museum',
    'hawking-udhr-exhibited-va-museum',
    "Stephen Hawking's Brief History of Time and the Universal Declaration of Human Rights were exhibited in crystal at the V&A's 'The Future Starts Here'.",
    '<p>Eternal copies of Stephen Hawking\'s "Brief History of Time" and the Universal Declaration of Human Rights were exhibited at the Victoria and Albert Museum\'s "The Future Starts Here" exhibition. The display showcased how 5D optical storage technology can preserve humanity\'s most important works for billions of years.</p>',
    '/news/va-museum.jpg',
    'V&A Museum The Future Starts Here exhibition with 5D Memory Crystal',
    '2018-10-08T00:00:00.000Z',
    'Victoria and Albert Museum',
    'events',
  ],
  [
    '5D Crystal Joins Tesla Roadster on SpaceX Journey',
    '5d-crystal-joins-tesla-roadster-spacex-journey',
    'In partnership with the Arch Mission Foundation, a 5D storage crystal was included in the SpaceX Falcon Heavy payload launched into solar orbit.',
    '<p>In partnership with the Arch Mission Foundation, a 5D storage crystal containing the Arch Library was included aboard the Tesla Roadster on SpaceX\'s Falcon Heavy rocket, launched toward Mars orbit. The crystal will orbit the Sun for billions of years, carrying a backup of human knowledge through space.</p>',
    '/news/SpaceX.png',
    '5D Memory Crystal aboard SpaceX Falcon Heavy payload',
    '2018-02-18T00:00:00.000Z',
    'Arch Mission Foundation',
    'partnerships',
  ],
  [
    'Eternal Holy Bible Gifted to the Vatican Library',
    'eternal-holy-bible-gifted-vatican-library',
    'The Biblioteca Apostolica Vaticana received an eternal copy of the Holy Bible, encoded in 5D crystal for permanent preservation.',
    '<p>An eternal copy of the Holy Bible was presented to the Biblioteca Apostolica Vaticana (Vatican Library), encoded in 5D crystal for permanent preservation. The crystal contains the complete text of the Bible inscribed using femtosecond laser technology, ensuring it will endure for billions of years.</p>',
    '/news/vatican-bible.jpg',
    'Eternal Holy Bible on 5D Memory Crystal for Vatican Library',
    '2017-04-17T00:00:00.000Z',
    'Vatican Library',
    'partnerships',
  ],
  [
    'Salisbury Cathedral Receives Magna Carta for Eternity',
    'salisbury-cathedral-receives-magna-carta-eternity',
    'A special glass disc copy of the Magna Carta was presented to Salisbury Cathedral, encoded in nanostructured quartz glass.',
    '<p>A special glass disc containing a copy of the Magna Carta was presented to Salisbury Cathedral, encoded in nanostructured quartz glass using 5D optical storage technology. The presentation marked a historic step in preserving one of the most important legal documents in history for eternity.</p>',
    '/collections/magna-carta.jpg',
    'Magna Carta encoded on 5D Memory Crystal at Salisbury Cathedral',
    '2016-06-16T00:00:00.000Z',
    'Salisbury Cathedral',
    'events',
  ],
  [
    'Eternal UDHR Presented to UNESCO',
    'eternal-udhr-presented-unesco',
    'An eternal copy of the Universal Declaration of Human Rights was presented at the International Year of Light closing ceremony in New Mexico.',
    '<p>A permanent copy of the Universal Declaration of Human Rights was presented at the International Year of Light closing ceremony in New Mexico. The crystal encodes the full text of the UDHR using 5D optical storage, ensuring this foundational human rights document endures for billions of years.</p>',
    '/collections/udhr.jpg',
    'Universal Declaration of Human Rights on 5D Memory Crystal at UNESCO',
    '2016-02-06T00:00:00.000Z',
    'UNESCO',
    'events',
  ],
  [
    'Wired Names 5D Crystal Among Eight Scientific Breakthroughs',
    'wired-names-5d-crystal-eight-scientific-breakthroughs',
    'Wired magazine recognised 5D optical storage as one of eight revolutionary scientific breakthroughs emerging from UK research.',
    '<p>Wired magazine recognised 5D optical storage technology as one of eight revolutionary scientific breakthroughs emerging from UK research. The recognition highlighted the breakthrough potential of femtosecond laser writing in fused quartz glass for permanent data storage.</p>',
    '/news/Human Genome.png',
    'Wired magazine recognition of 5D Memory Crystal technology',
    '2016-10-07T00:00:00.000Z',
    'Wired UK',
    'media',
  ],
];

for (const n of newsArticles) {
  insertNews.run(cuid(), n[0], n[1], n[2], n[3], n[4], n[5], 1, n[6], n[7], n[8], now, now);
}

console.log('Database seeded successfully');
db.close();
