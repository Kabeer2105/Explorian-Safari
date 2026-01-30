import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET videos (public)
export async function GET(request: NextRequest) {
  try {
    const videosSetting = await prisma.setting.findUnique({
      where: { key: 'youtube_videos' },
    });

    let videos = [];
    if (videosSetting && videosSetting.value) {
      videos = JSON.parse(videosSetting.value);
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
