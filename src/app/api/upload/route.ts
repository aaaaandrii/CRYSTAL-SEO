import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const ext = path.extname(file.name) || '.jpg';
    const safeName = file.name
      .replace(ext, '')
      .toLowerCase()
      .replace(/[^\w-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);
    const filename = `${safeName}-${Date.now()}${ext}`;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Write file
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    return Response.json({ url, filename }, { status: 201 });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return Response.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
