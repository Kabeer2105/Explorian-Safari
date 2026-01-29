import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET videos (public)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const where: any = { active: true };
    if (category && category !== 'all') {
      where.category = category;
    }

    const videos = await prisma.video.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
