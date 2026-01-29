import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET gallery images (public)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const where: any = { active: true };
    if (category && category !== 'all') {
      where.category = category;
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
