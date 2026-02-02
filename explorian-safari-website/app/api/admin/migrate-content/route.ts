import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// POST - Migrate gallery and videos from Setting table to dedicated tables
// This is a one-time migration endpoint - remove after use
export async function POST(request: NextRequest) {
  try {
    // Check if migration already ran
    const existingGallery = await prisma.galleryImage.count();
    const existingVideos = await prisma.video.count();

    if (existingGallery > 0 || existingVideos > 0) {
      return NextResponse.json({
        error: 'Migration already completed',
        message: `Found ${existingGallery} gallery images and ${existingVideos} videos in database`,
      }, { status: 400 });
    }

    let migratedGallery = 0;
    let migratedVideos = 0;

    // Migrate Gallery Images
    try {
      const gallerySetting = await prisma.setting.findUnique({
        where: { key: 'gallery_images' },
      });

      if (gallerySetting && gallerySetting.value) {
        const images = JSON.parse(gallerySetting.value);

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          await prisma.galleryImage.create({
            data: {
              url: image.url || '',
              title: image.title || image.caption || null,
              caption: image.caption || null,
              category: image.category || null,
              order: i + 1,
              active: true,
            },
          });
          migratedGallery++;
        }
      }
    } catch (error) {
      console.error('Error migrating gallery images:', error);
    }

    // Migrate Videos
    try {
      const videosSetting = await prisma.setting.findUnique({
        where: { key: 'youtube_videos' },
      });

      if (videosSetting && videosSetting.value) {
        const videos = JSON.parse(videosSetting.value);

        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          await prisma.video.create({
            data: {
              title: video.title || 'Untitled Video',
              description: video.description || null,
              url: video.youtube_url || video.url || '',
              thumbnailUrl: video.thumbnail_url || video.thumbnailUrl || null,
              type: 'youtube',
              category: video.category || null,
              order: i + 1,
              active: true,
            },
          });
          migratedVideos++;
        }
      }
    } catch (error) {
      console.error('Error migrating videos:', error);
    }

    return NextResponse.json({
      success: true,
      migratedGallery,
      migratedVideos,
      message: `Successfully migrated ${migratedGallery} gallery images and ${migratedVideos} videos`,
    });
  } catch (error) {
    console.error('Error during migration:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
