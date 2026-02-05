import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding gallery images and videos...');

  // Sample gallery images
  const galleryImages = [
    {
      url: '/images/gallery/wildlife-1.jpg',
      title: 'Lion Pride in Serengeti',
      caption: 'A majestic lion pride resting in the golden grass of Serengeti National Park',
      category: 'wildlife',
      order: 1,
    },
    {
      url: '/images/gallery/wildlife-2.jpg',
      title: 'Elephant Herd',
      caption: 'Family of elephants walking through Tarangire National Park',
      category: 'wildlife',
      order: 2,
    },
    {
      url: '/images/gallery/mountain-1.jpg',
      title: 'Kilimanjaro Summit',
      caption: 'Uhuru Peak at sunrise - the roof of Africa at 5,895 meters',
      category: 'mountains',
      order: 3,
    },
    {
      url: '/images/gallery/mountain-2.jpg',
      title: 'Trekkers on Kilimanjaro',
      caption: 'Climbers making their way through the alpine zone',
      category: 'mountains',
      order: 4,
    },
    {
      url: '/images/gallery/beach-1.jpg',
      title: 'Zanzibar Beach',
      caption: 'Pristine white sand beaches and turquoise waters of Zanzibar',
      category: 'beaches',
      order: 5,
    },
    {
      url: '/images/gallery/beach-2.jpg',
      title: 'Snorkeling in Zanzibar',
      caption: 'Exploring the vibrant coral reefs of the Indian Ocean',
      category: 'beaches',
      order: 6,
    },
    {
      url: '/images/gallery/culture-1.jpg',
      title: 'Maasai Village',
      caption: 'Traditional Maasai warriors welcoming visitors',
      category: 'culture',
      order: 7,
    },
    {
      url: '/images/gallery/culture-2.jpg',
      title: 'Stone Town',
      caption: 'Historic architecture in the heart of Zanzibar',
      category: 'culture',
      order: 8,
    },
  ];

  for (const image of galleryImages) {
    try {
      await prisma.galleryImage.create({
        data: { ...image, active: true },
      });
      console.log(`Created gallery image: ${image.title}`);
    } catch (error) {
      console.log(`Gallery image already exists: ${image.title}`);
    }
  }

  // Sample videos
  const videos = [
    {
      title: 'Serengeti Safari Experience',
      description: 'Take a virtual tour of the magnificent Serengeti National Park',
      url: 'https://www.youtube.com/watch?v=example1',
      thumbnailUrl: '/images/videos/serengeti-thumb.jpg',
      type: 'youtube',
      category: 'safari',
      order: 1,
    },
    {
      title: 'Climbing Mount Kilimanjaro',
      description: 'Follow our journey to the summit of Africa\'s highest peak',
      url: 'https://www.youtube.com/watch?v=example2',
      thumbnailUrl: '/images/videos/kilimanjaro-thumb.jpg',
      type: 'youtube',
      category: 'mountain',
      order: 2,
    },
    {
      title: 'Zanzibar Beach Paradise',
      description: 'Discover the tropical paradise of Zanzibar',
      url: 'https://www.youtube.com/watch?v=example3',
      thumbnailUrl: '/images/videos/zanzibar-thumb.jpg',
      type: 'youtube',
      category: 'beach',
      order: 3,
    },
  ];

  for (const video of videos) {
    try {
      await prisma.video.create({
        data: { ...video, active: true },
      });
      console.log(`Created video: ${video.title}`);
    } catch (error) {
      console.log(`Video already exists: ${video.title}`);
    }
  }

  console.log('Media seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding media:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
