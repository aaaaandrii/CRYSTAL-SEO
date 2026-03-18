import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { newsCreateSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get('all') === 'true';

    const articles = await prisma.newsArticle.findMany({
      where: all ? {} : { published: true },
      orderBy: { publishedAt: 'desc' },
    });

    return Response.json(articles);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return Response.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = newsCreateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let slug = slugify(data.title);

    // Ensure slug uniqueness
    const existing = await prisma.newsArticle.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const article = await prisma.newsArticle.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt || '',
        published: data.published ?? false,
        publishedAt: data.published ? new Date() : null,
        source: data.source || null,
        sourceName: data.sourceName || null,
        tags: data.tags || '',
      },
    });

    return Response.json(article, { status: 201 });
  } catch (error) {
    console.error('Failed to create news article:', error);
    return Response.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}
