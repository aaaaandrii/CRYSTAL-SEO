import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { newsUpdateSchema } from '@/lib/validations';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const article = await prisma.newsArticle.findUnique({ where: { id } });

    if (!article) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }

    return Response.json(article);
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return Response.json(
      { error: 'Failed to fetch article' },
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
    const existing = await prisma.newsArticle.findUnique({ where: { id } });

    if (!existing) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }

    const body = await request.json();
    const parsed = newsUpdateSchema.safeParse(body);

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
      const slugExists = await prisma.newsArticle.findFirst({
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

    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        ...data,
        slug,
        publishedAt,
        source: data.source || null,
        sourceName: data.sourceName || null,
      },
    });

    return Response.json(article);
  } catch (error) {
    console.error('Failed to update article:', error);
    return Response.json(
      { error: 'Failed to update article' },
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
    const existing = await prisma.newsArticle.findUnique({ where: { id } });

    if (!existing) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }

    await prisma.newsArticle.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return Response.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
