import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { slugify } from '@/lib/utils';
import { caseStudyCreateSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get('all') === 'true';
    const sector = searchParams.get('sector');
    const featured = searchParams.get('featured') === 'true';

    const where: Record<string, unknown> = {};
    if (!all) where.published = true;
    if (sector) where.sector = sector;
    if (featured) where.featured = true;

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });

    return Response.json(caseStudies);
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return Response.json(
      { error: 'Failed to fetch case studies' },
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
    const parsed = caseStudyCreateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    let slug = slugify(data.title);

    // Ensure slug uniqueness
    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: data.title,
        slug,
        client: data.client,
        sector: data.sector,
        excerpt: data.excerpt,
        challenge: data.challenge,
        solution: data.solution,
        outcome: data.outcome,
        content: data.content,
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt || '',
        logoUrl: data.logoUrl || null,
        published: data.published ?? false,
        publishedAt: data.published ? new Date() : null,
        featured: data.featured ?? false,
      },
    });

    return Response.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error('Failed to create case study:', error);
    return Response.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    );
  }
}
