// Lightweight Yoast-style SEO content analysis.
// Pure functions, no dependencies. Returned check results power the
// SeoSidebar in the admin News and Case Studies forms.

export type CheckStatus = 'good' | 'ok' | 'bad' | 'neutral';

export interface SeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
}

export interface SeoInput {
  title: string;
  excerpt: string;
  content: string;
  imageAlt?: string;
  keyphrase: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

function lower(s: string): string {
  return s.toLowerCase();
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsKeyphrase(text: string, keyphrase: string): boolean {
  if (!keyphrase.trim()) return false;
  return lower(text).includes(lower(keyphrase));
}

function firstParagraph(content: string): string {
  // Try HTML <p>…</p>, then double newline, else first 500 chars.
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) return stripHtml(pMatch[1]);
  const split = content.split(/\n\s*\n/)[0] ?? '';
  return stripHtml(split).slice(0, 500);
}

export function runSeoChecks(input: SeoInput): SeoCheck[] {
  const { title, excerpt, content, imageAlt = '', keyphrase } = input;
  const cleanContent = stripHtml(content);
  const contentWords = countWords(cleanContent);
  const hasKp = keyphrase.trim().length > 0;
  const checks: SeoCheck[] = [];

  // ── Title length ───────────────────────────────────────────────────
  const titleLen = title.length;
  checks.push({
    id: 'title-length',
    label: 'Title length',
    status:
      titleLen === 0
        ? 'bad'
        : titleLen < 30
          ? 'ok'
          : titleLen <= 60
            ? 'good'
            : 'ok',
    message:
      titleLen === 0
        ? 'Add a title.'
        : titleLen < 30
          ? `Title is short (${titleLen} chars). Aim for 50–60.`
          : titleLen <= 60
            ? `Title length is ideal (${titleLen} chars).`
            : `Title is long (${titleLen} chars). Aim for 50–60.`,
  });

  // ── Excerpt / meta description length ──────────────────────────────
  const excerptLen = excerpt.length;
  checks.push({
    id: 'excerpt-length',
    label: 'Excerpt / meta description',
    status:
      excerptLen === 0
        ? 'bad'
        : excerptLen < 120
          ? 'ok'
          : excerptLen <= 160
            ? 'good'
            : 'ok',
    message:
      excerptLen === 0
        ? 'Add an excerpt — it doubles as the meta description.'
        : excerptLen < 120
          ? `Excerpt is short (${excerptLen} chars). Aim for 120–160.`
          : excerptLen <= 160
            ? `Excerpt length is ideal (${excerptLen} chars).`
            : `Excerpt is long (${excerptLen} chars). Aim for 120–160.`,
  });

  // ── Content length ─────────────────────────────────────────────────
  checks.push({
    id: 'content-length',
    label: 'Content length',
    status:
      contentWords === 0
        ? 'neutral'
        : contentWords < 100
          ? 'ok'
          : contentWords < 300
            ? 'ok'
            : 'good',
    message:
      contentWords === 0
        ? 'No content body — optional, but 300+ words is best for SEO.'
        : contentWords < 100
          ? `Content is short (${contentWords} words). 300+ is recommended.`
          : contentWords < 300
            ? `${contentWords} words. 300+ is ideal.`
            : `${contentWords} words — good.`,
  });

  // ── Subheadings (only matters once content is long enough) ────────
  if (contentWords >= 200) {
    const hasSubheading = /<h[2-6][^>]*>/i.test(content);
    checks.push({
      id: 'subheading',
      label: 'Subheadings',
      status: hasSubheading ? 'good' : 'ok',
      message: hasSubheading
        ? 'Subheadings present.'
        : 'Break the content up with H2/H3 subheadings.',
    });
  }

  // ── Image alt text ─────────────────────────────────────────────────
  checks.push({
    id: 'image-alt',
    label: 'Image alt text',
    status: imageAlt.trim().length === 0 ? 'bad' : 'good',
    message:
      imageAlt.trim().length === 0
        ? 'Add alt text for accessibility and SEO.'
        : 'Alt text present.',
  });

  // ── Keyphrase-driven checks (only when a focus keyphrase is set) ──
  if (hasKp) {
    checks.push({
      id: 'kp-title',
      label: 'Keyphrase in title',
      status: containsKeyphrase(title, keyphrase) ? 'good' : 'bad',
      message: containsKeyphrase(title, keyphrase)
        ? 'Focus keyphrase appears in the title.'
        : 'Add the focus keyphrase to the title.',
    });

    checks.push({
      id: 'kp-excerpt',
      label: 'Keyphrase in excerpt',
      status: containsKeyphrase(excerpt, keyphrase) ? 'good' : 'bad',
      message: containsKeyphrase(excerpt, keyphrase)
        ? 'Focus keyphrase appears in the excerpt.'
        : 'Add the focus keyphrase to the excerpt.',
    });

    if (cleanContent.length > 0) {
      const opener = firstParagraph(content);
      checks.push({
        id: 'kp-first-para',
        label: 'Keyphrase in opening',
        status: containsKeyphrase(opener, keyphrase) ? 'good' : 'ok',
        message: containsKeyphrase(opener, keyphrase)
          ? 'Keyphrase appears in the opening paragraph.'
          : 'Mention the keyphrase in the first paragraph.',
      });
    }

    if (contentWords >= 50) {
      const kp = lower(keyphrase.trim());
      const occurrences =
        lower(cleanContent).match(new RegExp(escapeRegex(kp), 'g'))?.length ?? 0;
      const kpWordCount = countWords(keyphrase);
      const density = (occurrences * kpWordCount) / contentWords;
      const pct = (density * 100).toFixed(2);
      const status: CheckStatus =
        density === 0
          ? 'bad'
          : density < 0.005
            ? 'ok'
            : density <= 0.025
              ? 'good'
              : 'ok';
      checks.push({
        id: 'kp-density',
        label: 'Keyphrase density',
        status,
        message:
          density === 0
            ? "Keyphrase doesn't appear in the body content."
            : `${pct}% (${occurrences} occurrence${occurrences === 1 ? '' : 's'}). Target 0.5–2.5%.`,
      });
    }
  }

  return checks;
}

export function scoreFromChecks(
  checks: SeoCheck[]
): { score: number; label: string } {
  const valid = checks.filter((c) => c.status !== 'neutral');
  if (valid.length === 0) return { score: 0, label: 'Not enough data' };
  const points = valid.reduce(
    (sum, c) =>
      sum + (c.status === 'good' ? 1 : c.status === 'ok' ? 0.5 : 0),
    0
  );
  const score = Math.round((points / valid.length) * 100);
  const label =
    score >= 80
      ? 'Great'
      : score >= 60
        ? 'OK'
        : score >= 30
          ? 'Needs work'
          : 'Poor';
  return { score, label };
}
