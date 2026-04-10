// Idempotent content upgrade script.
//
// Runs on container startup BEFORE the Next.js server boots. Reads a
// committed snapshot of PageContent + ContentItem + CaseStudy-content
// fields from prisma/content-snapshot.json and applies them to the
// runtime database (the persistent volume in production).
//
// This exists because:
// - seed.mjs is destructive (wipes User/News/CaseStudy) and only runs at
//   image build time into the gitignored dev.db.
// - The Railway persistent volume DB (/app/data/prod.db) is NOT reseeded
//   by start.sh, so content edits baked into seed.mjs never reach it
//   after the first boot.
// - Admin panel edits to PageContent/ContentItem were lost across deploys
//   and copy edits made in source code were invisible because DB rows
//   override defaults.
//
// Safety:
// - PageContent is upserted by (page, section). Safe — one row per section.
// - ContentItem is fully replaced per type. Any type present in the
//   snapshot has ALL its existing rows deleted and re-inserted from the
//   snapshot. Types NOT in the snapshot are left untouched.
// - CaseStudy only has specific text fields (excerpt/challenge/solution/
//   outcome/content/title) updated by slug. Rows are neither created nor
//   deleted here — that happens via the admin panel / seed on first boot.
// - NewsArticle and User are never touched.
//
// Controlled by env var CONTENT_UPGRADE=1 (default on). Set to 0 to skip.

import Database from 'better-sqlite3';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';

if (process.env.CONTENT_UPGRADE === '0') {
  console.log('[content-upgrade] skipped (CONTENT_UPGRADE=0)');
  process.exit(0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve DB path from DATABASE_URL ("file:/app/data/prod.db") or default.
function resolveDbPath() {
  const url = process.env.DATABASE_URL;
  if (url && url.startsWith('file:')) {
    return url.slice('file:'.length);
  }
  return join(__dirname, '..', 'prisma', 'dev.db');
}

const dbPath = resolveDbPath();
const snapshotPath = join(__dirname, '..', 'prisma', 'content-snapshot.json');

if (!existsSync(dbPath)) {
  console.log(`[content-upgrade] database not found at ${dbPath}; skipping`);
  process.exit(0);
}
if (!existsSync(snapshotPath)) {
  console.log(`[content-upgrade] snapshot not found at ${snapshotPath}; skipping`);
  process.exit(0);
}

const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
const db = new Database(dbPath);

function cuid() {
  return 'c' + randomBytes(12).toString('hex');
}

const now = new Date().toISOString();
let pcCount = 0;
let ciCount = 0;
let csCount = 0;

db.exec('BEGIN');
try {
  // ── PageContent: upsert by (page, section) ─────────────────────────
  const pcGet = db.prepare(
    'SELECT id FROM PageContent WHERE page = ? AND section = ?'
  );
  const pcUpdate = db.prepare(
    'UPDATE PageContent SET content = ?, updatedAt = ? WHERE id = ?'
  );
  const pcInsert = db.prepare(
    'INSERT INTO PageContent (id, page, section, content, updatedAt) VALUES (?, ?, ?, ?, ?)'
  );

  for (const row of snapshot.pageContent || []) {
    const json = JSON.stringify(row.content);
    const existing = pcGet.get(row.page, row.section);
    if (existing) {
      pcUpdate.run(json, now, existing.id);
    } else {
      pcInsert.run(cuid(), row.page, row.section, json, now);
    }
    pcCount++;
  }

  // ── ContentItem: replace-per-type ──────────────────────────────────
  // Collect all types present in the snapshot, delete those types from
  // the DB, then re-insert from the snapshot. Any types not in the
  // snapshot are left as-is.
  const typesInSnapshot = [
    ...new Set((snapshot.contentItems || []).map((i) => i.type)),
  ];
  const ciDeleteByType = db.prepare('DELETE FROM ContentItem WHERE type = ?');
  const ciInsert = db.prepare(
    'INSERT INTO ContentItem (id, type, data, sortOrder, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  for (const type of typesInSnapshot) {
    ciDeleteByType.run(type);
  }
  for (const item of snapshot.contentItems || []) {
    ciInsert.run(
      cuid(),
      item.type,
      JSON.stringify(item.data),
      item.sortOrder ?? 0,
      item.published ? 1 : 0,
      now,
      now
    );
    ciCount++;
  }

  // ── CaseStudy: update text fields by slug ──────────────────────────
  const csUpdate = db.prepare(
    `UPDATE CaseStudy
       SET title = ?, excerpt = ?, challenge = ?, solution = ?,
           outcome = ?, content = ?, updatedAt = ?
     WHERE slug = ?`
  );
  for (const cs of snapshot.caseStudies || []) {
    const res = csUpdate.run(
      cs.title,
      cs.excerpt,
      cs.challenge,
      cs.solution,
      cs.outcome,
      cs.content,
      now,
      cs.slug
    );
    if (res.changes > 0) csCount++;
  }

  db.exec('COMMIT');
  console.log(
    `[content-upgrade] applied: PageContent=${pcCount}, ContentItem=${ciCount} (types=${typesInSnapshot.length}), CaseStudy=${csCount}`
  );
} catch (err) {
  db.exec('ROLLBACK');
  console.error('[content-upgrade] FAILED, rolled back:', err);
  // Non-fatal — server should still start.
  process.exit(0);
} finally {
  db.close();
}
