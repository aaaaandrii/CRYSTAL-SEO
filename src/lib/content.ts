import { prisma } from './prisma';

/**
 * Get page section content from the database.
 * Falls back to defaultValue if no DB row exists (graceful migration).
 */
export async function getPageContent<T extends Record<string, unknown>>(
  page: string,
  section: string,
  defaultValue: T
): Promise<T> {
  try {
    const row = await prisma.pageContent.findUnique({
      where: { page_section: { page, section } },
    });
    if (row) {
      return { ...defaultValue, ...JSON.parse(row.content) } as T;
    }
  } catch {
    // DB not seeded yet or parse error — use defaults
  }
  return defaultValue;
}

/**
 * Get list-based content items from the database.
 * Falls back to defaultItems if no DB rows exist.
 */
export async function getContentItems<T extends Record<string, unknown>>(
  type: string,
  defaultItems: T[] = []
): Promise<T[]> {
  try {
    const rows = await prisma.contentItem.findMany({
      where: { type, published: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (rows.length > 0) {
      return rows.map((row) => JSON.parse(row.data) as T);
    }
  } catch {
    // DB not seeded yet — use defaults
  }
  return defaultItems;
}
