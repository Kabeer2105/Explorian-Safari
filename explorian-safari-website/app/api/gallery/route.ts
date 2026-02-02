import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET gallery images (public - fetches from GalleryImage table)
export async function GET(request: NextRequest) {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        url: true,
        title: true,
        caption: true,
        category: true,
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
