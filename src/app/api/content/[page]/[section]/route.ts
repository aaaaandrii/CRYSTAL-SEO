import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/content/[page]/[section]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ page: string; section: string }> }
) {
  const { page, section } = await params;

  const row = await prisma.pageContent.findUnique({
    where: { page_section: { page, section } },
  });

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ page, section, content: JSON.parse(row.content) });
}

// PUT /api/content/[page]/[section] — upsert section content
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ page: string; section: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { page, section } = await params;
  const body = await request.json();

  const row = await prisma.pageContent.upsert({
    where: { page_section: { page, section } },
    update: { content: JSON.stringify(body.content) },
    create: {
      page,
      section,
      content: JSON.stringify(body.content),
    },
  });

  // Revalidate the affected page
  const pagePath = page === 'home' ? '/' : `/${page}`;
  revalidatePath(pagePath);

  return NextResponse.json({ page, section, content: JSON.parse(row.content) });
}
