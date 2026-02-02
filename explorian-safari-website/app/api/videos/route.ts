import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET videos (public - fetches from Video table)
export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        category: true,
      },
    });

    // Map to match the expected format (youtube_url field)
    const formattedVideos = videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description || '',
      youtube_url: video.url,
      category: video.category,
    }));

    return NextResponse.json({ videos: formattedVideos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
