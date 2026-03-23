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
  let session;
  try {
    session = await auth();
  } catch (err) {
    console.error('Auth error in content PUT:', err);
    return NextResponse.json({ error: 'Auth error', details: String(err) }, { status: 500 });
  }

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { page, section } = await params;

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON', details: String(err) }, { status: 400 });
  }

  try {
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
    try {
      const pagePath = page === 'home' ? '/' : `/${page}`;
      revalidatePath(pagePath);
    } catch {
      // revalidatePath may fail in certain contexts — non-fatal
    }

    return NextResponse.json({ page, section, content: JSON.parse(row.content) });
  } catch (err) {
    console.error('Content save error:', err);
    return NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 });
  }
}
