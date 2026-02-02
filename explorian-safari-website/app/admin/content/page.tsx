import { prisma } from '@/lib/prisma';
import ContentClient from './ContentClient';

export default async function ContentPage() {
  const [gallery, videos] = await Promise.all([
    prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    }),
    prisma.video.findMany({
      orderBy: { order: 'asc' },
    }),
  ]);

  return <ContentClient initialGallery={gallery} initialVideos={videos} />;
}
