import { PrismaClient, Package_type } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@exploriansafaris.com' },
    update: {},
    create: {
      email: 'admin@exploriansafaris.com',
      password_hash: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create some sample packages
  const serengetiSafari = await prisma.package.upsert({
    where: { slug: 'serengeti-wildlife-safari' },
    update: {},
    create: {
      name: 'Serengeti Wildlife Safari',
      slug: 'serengeti-wildlife-safari',
      type: 'SAFARI' as Package_type,
      description: 'Embark on an unforgettable 5-day journey through the iconic Serengeti National Park, home to the Great Migration and the Big Five. This classic safari experience offers incredible wildlife viewing opportunities in one of Africa\'s most famous wildlife reserves.',
      highlights: JSON.stringify([
        'Witness the Great Migration (seasonal)',
        'Big Five wildlife viewing',
        'Professional safari guide',
        'Luxury tented accommodation',
        'Full board meals included',
      ]),
      inclusions: JSON.stringify([
        'Airport transfers',
        'Transportation in 4x4 safari vehicle',
        'Professional English-speaking guide',
        'Accommodation for 4 nights',
        'All meals (breakfast, lunch, dinner)',
        'Park entrance fees',
        'Game drives',
        'Drinking water during game drives',
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Travel insurance',
        'Visa fees',
        'Personal expenses',
        'Tips and gratuities',
        'Alcoholic beverages',
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Arrival in Arusha',
          
        },
        {
          day: 2,
          title: 'Arusha to Serengeti',
          
        },
        {
          day: 3,
          title: 'Full Day Serengeti',
          
        },
        {
          day: 4,
          title: 'Serengeti to Ngorongoro',
          
        },
        {
          day: 5,
          title: 'Ngorongoro Crater - Departure',
          
        },
      ]),
      duration_days: 5,
      price_from: 1850,
      currency: 'USD',
      max_group_size: 6,
      difficulty_level: 'easy',
      active: true,
      featured: true,
    },
  });
  console.log('Created package:', serengetiSafari.name);

  const kilimanjaroTrek = await prisma.package.upsert({
    where: { slug: 'kilimanjaro-machame-route' },
    update: {},
    create: {
      name: 'Kilimanjaro - Machame Route',
      slug: 'kilimanjaro-machame-route',
      type: 'MOUNTAIN' as Package_type,
      description: 'The Machame Route, also known as the "Whiskey Route," is one of the most popular and scenic routes up Mount Kilimanjaro. This 7-day trek offers stunning views, diverse landscapes, and excellent acclimatization.',
      highlights: JSON.stringify([
        'Summit Africa\'s highest peak (5,895m)',
        'Scenic Machame Route',
        'Experienced mountain guides',
        'Full camping equipment provided',
        'High success rate',
      ]),
      inclusions: JSON.stringify([
        'Airport transfers',
        'Professional mountain guides',
        'Camping equipment',
        'All meals on the mountain',
        'Park fees and rescue fees',
        'Porters and cook',
        'Pre-trek briefing',
        'Certificate upon completion',
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Travel insurance',
        'Visa fees',
        'Personal trekking gear',
        'Tips for guides and porters',
        'Personal expenses',
      ]),
      itinerary: JSON.stringify([
        {
          day: 1,
          title: 'Machame Gate to Machame Camp',
          
        },
        {
          day: 2,
          title: 'Machame Camp to Shira Camp',
          
        },
        {
          day: 3,
          title: 'Shira Camp to Barranco Camp',
          
        },
        {
          day: 4,
          title: 'Barranco Camp to Karanga Camp',
          
        },
        {
          day: 5,
          title: 'Karanga Camp to Barafu Camp',
          
        },
        {
          day: 6,
          title: 'Summit Day - Uhuru Peak',
          
        },
        {
          day: 7,
          title: 'Mweka Camp to Mweka Gate',
          
        },
      ]),
      duration_days: 7,
      price_from: 2100,
      currency: 'USD',
      max_group_size: 12,
      difficulty_level: 'challenging',
      active: true,
      featured: true,
    },
  });
  console.log('Created package:', kilimanjaroTrek.name);

  const zanzibarBeach = await prisma.package.upsert({
    where: { slug: 'zanzibar-beach-relaxation' },
    update: {},
    create: {
      name: 'Zanzibar Beach Relaxation',
      slug: 'zanzibar-beach-relaxation',
      type: 'BEACH' as Package_type,
      description: 'Unwind on the beautiful beaches of Zanzibar after your safari or mountain trek. This 5-day beach holiday includes accommodation at a beach resort, water sports, and optional cultural tours of Stone Town.',
      highlights: JSON.stringify([
        'Pristine white sand beaches',
        'Crystal clear turquoise waters',
        'Water sports activities',
        'Stone Town cultural tour',
        'Fresh seafood dining',
      ]),
      inclusions: JSON.stringify([
        'Airport transfers',
        'Beach resort accommodation',
        'Daily breakfast',
        'Stone Town tour',
        'Spice farm tour',
        'Snorkeling equipment',
      ]),
      exclusions: JSON.stringify([
        'International flights',
        'Lunch and dinner',
        'Travel insurance',
        'Water sports (diving, jet ski, etc.)',
        'Personal expenses',
      ]),
      duration_days: 5,
      price_from: 850,
      currency: 'USD',
      max_group_size: 20,
      difficulty_level: 'easy',
      active: true,
      featured: true,
    },
  });
  console.log('Created package:', zanzibarBeach.name);

  // Create some FAQs
  await prisma.faq.createMany({
    data: [
      {
        question: 'What is the best time to visit Tanzania?',
        answer: 'The best time for safaris is during the dry season (June-October) when wildlife viewing is at its peak. For climbing Kilimanjaro, the best months are January-March and June-October. Beach holidays are great year-round, though avoid April-May (heavy rains).',
        category: 'general',
        order: 1,
        active: true,
      },
      {
        question: 'Do I need a visa to visit Tanzania?',
        answer: 'Most visitors need a visa to enter Tanzania. You can obtain a visa on arrival at major entry points or apply for an e-visa online before travel. US, UK, EU, Canadian, and Australian citizens can get a tourist visa on arrival ($50-100 USD depending on nationality).',
        category: 'visa',
        order: 2,
        active: true,
      },
      {
        question: 'What should I pack for a safari?',
        answer: 'Pack lightweight, neutral-colored clothing (avoid bright colors), comfortable walking shoes, a wide-brimmed hat, sunglasses, sunscreen, insect repellent, binoculars, camera with extra batteries, and a light jacket for early mornings. Don\'t forget any personal medications.',
        category: 'packing',
        order: 3,
        active: true,
      },
      {
        question: 'Is it safe to travel in Tanzania?',
        answer: 'Tanzania is generally safe for tourists, especially in safari areas and tourist destinations. We recommend following standard safety precautions: don\'t walk alone at night, keep valuables secure, and follow your guide\'s instructions during wildlife activities. Our experienced guides prioritize your safety.',
        category: 'general',
        order: 4,
        active: true,
      },
      {
        question: 'Can I customize my safari itinerary?',
        answer: 'Yes! We specialize in creating custom safari experiences tailored to your interests, budget, and schedule. Contact us with your preferences, and we\'ll design a personalized itinerary just for you.',
        category: 'general',
        order: 5,
        active: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('Created FAQs');

  // Create some settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'site_title',
        value: 'Explorian Safaris - Tanzania Safari Experts',
        updated_at: new Date(),
      },
      {
        key: 'contact_email',
        value: 'info@exploriansafaris.com',
        updated_at: new Date(),
      },
      {
        key: 'contact_phone',
        value: '+255 719 245 540',
        updated_at: new Date(),
      },
      {
        key: 'contact_address',
        value: 'Moshi, Kilimanjaro, Tanzania',
        updated_at: new Date(),
      },
      {
        key: 'social_facebook',
        value: 'https://facebook.com/exploriansafaris',
        updated_at: new Date(),
      },
      {
        key: 'social_instagram',
        value: 'https://instagram.com/explorian_safaris',
        updated_at: new Date(),
      },
      {
        key: 'social_twitter',
        value: 'https://twitter.com/exploriansafaris',
        updated_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });
  console.log('Created settings');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
