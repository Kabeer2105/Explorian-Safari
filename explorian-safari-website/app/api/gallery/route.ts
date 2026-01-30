import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET gallery images (public)
export async function GET(request: NextRequest) {
  try {
    const gallerySetting = await prisma.setting.findUnique({
      where: { key: 'gallery_images' },
    });

    let images = [];
    if (gallerySetting && gallerySetting.value) {
      images = JSON.parse(gallerySetting.value);
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
