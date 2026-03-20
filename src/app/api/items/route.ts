import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/items?type=faq
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'type parameter required' }, { status: 400 });
  }

  const items = await prisma.contentItem.findMany({
    where: { type },
    orderBy: { sortOrder: 'asc' },
  });

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      type: item.type,
      data: JSON.parse(item.data),
      sortOrder: item.sortOrder,
      published: item.published,
    }))
  );
}

// POST /api/items — create new content item
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, data, published } = body;

  if (!type || !data) {
    return NextResponse.json({ error: 'type and data required' }, { status: 400 });
  }

  // Get next sort order
  const last = await prisma.contentItem.findFirst({
    where: { type },
    orderBy: { sortOrder: 'desc' },
  });

  const item = await prisma.contentItem.create({
    data: {
      type,
      data: JSON.stringify(data),
      sortOrder: (last?.sortOrder ?? -1) + 1,
      published: published ?? true,
    },
  });

  revalidatePath('/');

  return NextResponse.json(
    { id: item.id, type: item.type, data: JSON.parse(item.data), sortOrder: item.sortOrder, published: item.published },
    { status: 201 }
  );
}

// PATCH /api/items — reorder items
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { items } = body as { items: { id: string; sortOrder: number }[] };

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'items array required' }, { status: 400 });
  }

  for (const item of items) {
    await prisma.contentItem.update({
      where: { id: item.id },
      data: { sortOrder: item.sortOrder },
    });
  }

  revalidatePath('/');

  return NextResponse.json({ success: true });
}
