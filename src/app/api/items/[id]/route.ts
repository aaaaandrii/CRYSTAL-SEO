import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/items/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await prisma.contentItem.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: item.id,
    type: item.type,
    data: JSON.parse(item.data),
    sortOrder: item.sortOrder,
    published: item.published,
  });
}

// PUT /api/items/[id] — update content item
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { data, published } = body;

  const updateData: Record<string, unknown> = {};
  if (data !== undefined) updateData.data = JSON.stringify(data);
  if (published !== undefined) updateData.published = published;

  const item = await prisma.contentItem.update({
    where: { id },
    data: updateData,
  });

  revalidatePath('/');

  return NextResponse.json({
    id: item.id,
    type: item.type,
    data: JSON.parse(item.data),
    sortOrder: item.sortOrder,
    published: item.published,
  });
}

// DELETE /api/items/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await prisma.contentItem.delete({ where: { id } });

  revalidatePath('/');

  return NextResponse.json({ success: true });
}
