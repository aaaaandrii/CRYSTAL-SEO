import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { caseStudyUpdateSchema } from '@/lib/validations';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const caseStudy = await prisma.caseStudy.findUnique({ where: { id } });

    if (!caseStudy) {
      return Response.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    return Response.json(caseStudy);
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    return Response.json(
      { error: 'Failed to fetch case study' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.caseStudy.findUnique({ where: { id } });

    if (!existing) {
      return Response.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = caseStudyUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Update slug if title changed
    let slug = existing.slug;
    if (data.title && data.title !== existing.title) {
      slug = slugify(data.title);
      const slugExists = await prisma.caseStudy.findFirst({
        where: { slug, id: { not: id } },
      });
      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Set publishedAt when publishing for the first time
    let publishedAt = existing.publishedAt;
    if (data.published === true && !existing.publishedAt) {
      publishedAt = new Date();
    } else if (data.published === false) {
      publishedAt = null;
    }

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
        logoUrl: data.logoUrl || null,
      },
    });

    return Response.json(caseStudy);
  } catch (error) {
    console.error('Failed to update case study:', error);
    return Response.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.caseStudy.findUnique({ where: { id } });

    if (!existing) {
      return Response.json(
        { error: 'Case study not found' },
        { status: 404 }
      );
    }

    await prisma.caseStudy.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete case study:', error);
    return Response.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    );
  }
}
