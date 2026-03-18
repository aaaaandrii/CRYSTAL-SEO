import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { paths } = body as { paths?: string[] };

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return Response.json(
        { error: 'Provide an array of paths to revalidate' },
        { status: 400 }
      );
    }

    const revalidated: string[] = [];

    for (const p of paths) {
      if (typeof p === 'string' && p.startsWith('/')) {
        revalidatePath(p);
        revalidated.push(p);
      }
    }

    return Response.json({
      success: true,
      revalidated,
    });
  } catch (error) {
    console.error('Failed to revalidate:', error);
    return Response.json(
      { error: 'Failed to revalidate paths' },
      { status: 500 }
    );
  }
}
