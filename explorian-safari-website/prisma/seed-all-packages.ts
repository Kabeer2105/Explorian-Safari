import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding all packages...');

  const packages = [
    // SAFARI PACKAGES
    {
      name: 'Serengeti Wildlife Safari',
      slug: 'serengeti-wildlife-safari',
      type: 'safari',
      shortDescription: 'Experience the magnificent wildlife of Serengeti National Park',
      description: 'Embark on an unforgettable 5-day journey through the iconic Serengeti National Park, home to the Great Migration and the Big Five.',
      highlights: JSON.stringify([
        'Witness the Great Migration (seasonal)',
        'Big Five wildlife viewing',
        'Professional safari guide',
        'Luxury tented accommodation',
      ]),
      inclusions: JSON.stringify([
        'Airport transfers',
        'Transportation in 4x4 safari vehicle',
        'Professional guide',
        'Accommodation',
        'All meals',
        'Park fees',
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Travel insurance',
        'Visa fees',
        'Tips and gratuities',
      ]),
      durationDays: 5,
      priceFrom: 1850,
      featured: true,
    },
    {
      name: 'Ngorongoro Crater Safari',
      slug: 'ngorongoro-crater-safari',
      type: 'safari',
      shortDescription: 'Explore the world\'s largest inactive volcanic caldera',
      description: 'A 3-day safari to the stunning Ngorongoro Crater, a UNESCO World Heritage Site and home to incredible wildlife density.',
      durationDays: 3,
      priceFrom: 980,
      featured: false,
    },
    {
      name: 'Tarangire National Park Safari',
      slug: 'tarangire-national-park-safari',
      type: 'safari',
      shortDescription: 'Home to massive elephant herds and ancient baobab trees',
      description: 'A 2-day safari to Tarangire National Park, famous for its elephant populations and beautiful landscapes.',
      durationDays: 2,
      priceFrom: 650,
      featured: false,
    },

    // MOUNTAIN PACKAGES
    {
      name: 'Kilimanjaro - Machame Route',
      slug: 'kilimanjaro-machame-route',
      type: 'mountain',
      shortDescription: 'Conquer Africa\'s highest peak via the scenic Machame Route',
      description: 'The Machame Route, also known as the "Whiskey Route," is one of the most popular routes up Mount Kilimanjaro.',
      highlights: JSON.stringify([
        'Summit Africa\'s highest peak (5,895m)',
        'Scenic Machame Route',
        'Experienced mountain guides',
        'Full camping equipment provided',
      ]),
      durationDays: 7,
      priceFrom: 2100,
      featured: true,
      difficultyLevel: 'challenging',
    },
    {
      name: 'Kilimanjaro - Marangu Route',
      slug: 'kilimanjaro-marangu-route',
      type: 'mountain',
      shortDescription: 'The "Coca-Cola" route with hut accommodation',
      description: 'The Marangu Route is the most popular Kilimanjaro route, featuring hut accommodation instead of camping.',
      durationDays: 6,
      priceFrom: 1850,
      featured: false,
      difficultyLevel: 'moderate',
    },
    {
      name: 'Mount Meru Trek',
      slug: 'mount-meru-trek',
      type: 'mountain',
      shortDescription: 'Tanzania\'s second highest mountain',
      description: 'A 4-day trek up Mount Meru, offering stunning views of Kilimanjaro and excellent acclimatization.',
      durationDays: 4,
      priceFrom: 1200,
      featured: false,
      difficultyLevel: 'moderate',
    },

    // BEACH PACKAGES
    {
      name: 'Zanzibar Beach Relaxation',
      slug: 'zanzibar-beach-relaxation',
      type: 'beach',
      shortDescription: 'Relax on pristine white sand beaches in tropical paradise',
      description: 'Unwind on the beautiful beaches of Zanzibar after your safari or mountain trek.',
      highlights: JSON.stringify([
        'Pristine white sand beaches',
        'Crystal clear turquoise waters',
        'Stone Town cultural tour',
        'Fresh seafood dining',
      ]),
      durationDays: 5,
      priceFrom: 850,
      featured: true,
    },
    {
      name: 'Pemba Island Escape',
      slug: 'pemba-island-escape',
      type: 'beach',
      shortDescription: 'Discover the untouched beauty of Pemba Island',
      description: 'Experience the less-visited Pemba Island, known for its pristine beaches and excellent diving.',
      durationDays: 4,
      priceFrom: 950,
      featured: false,
    },
    {
      name: 'Mafia Island Diving',
      slug: 'mafia-island-diving',
      type: 'beach',
      shortDescription: 'World-class diving and whale shark encounters',
      description: 'Explore the incredible marine life of Mafia Island, including whale sharks and pristine coral reefs.',
      durationDays: 5,
      priceFrom: 1150,
      featured: false,
    },

    // DAY TRIP PACKAGES
    {
      name: 'Materuni Waterfalls & Coffee Tour',
      slug: 'materuni-waterfalls-coffee-tour',
      type: 'daytrip',
      shortDescription: 'Visit stunning waterfalls and learn about coffee production',
      description: 'A day trip to the beautiful Materuni Waterfalls, followed by a traditional coffee-making experience.',
      durationDays: 1,
      priceFrom: 85,
      featured: false,
    },
    {
      name: 'Chemka Hot Springs',
      slug: 'chemka-hot-springs',
      type: 'daytrip',
      shortDescription: 'Swim in natural crystal-clear hot springs',
      description: 'A relaxing day trip to the stunning Chemka Hot Springs, perfect for swimming and relaxation.',
      durationDays: 1,
      priceFrom: 75,
      featured: false,
    },
    {
      name: 'Lake Manyara Day Safari',
      slug: 'lake-manyara-day-safari',
      type: 'daytrip',
      shortDescription: 'Tree-climbing lions and flamingo flocks',
      description: 'A day safari to Lake Manyara National Park, famous for its tree-climbing lions and birdlife.',
      durationDays: 1,
      priceFrom: 180,
      featured: false,
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: {
        ...pkg,
        active: true,
        currency: 'USD',
        maxGroupSize: 12,
        difficultyLevel: pkg.difficultyLevel || 'easy',
      },
    });
    console.log(`Created/Updated package: ${pkg.name}`);
  }

  console.log('All packages seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding packages:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
