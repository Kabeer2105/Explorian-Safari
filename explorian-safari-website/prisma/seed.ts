import { PrismaClient } from '@prisma/client';
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
      passwordHash: hashedPassword,
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
      type: 'safari',
      shortDescription: 'Experience the magnificent wildlife of Serengeti National Park',
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
          description: 'Arrive at Kilimanjaro Airport. Transfer to your hotel in Arusha. Evening briefing about your safari.',
        },
        {
          day: 2,
          title: 'Arusha to Serengeti',
          description: 'After breakfast, depart for Serengeti National Park. Game drive en route. Arrive at your lodge in the afternoon.',
        },
        {
          day: 3,
          title: 'Full Day Serengeti',
          description: 'Full day of game drives in Serengeti. Morning and afternoon drives with lunch at the lodge.',
        },
        {
          day: 4,
          title: 'Serengeti to Ngorongoro',
          description: 'Morning game drive, then drive to Ngorongoro Crater rim. Overnight at crater rim lodge.',
        },
        {
          day: 5,
          title: 'Ngorongoro Crater - Departure',
          description: 'Early morning descent into Ngorongoro Crater for game drive. Afternoon return to Arusha for departure.',
        },
      ]),
      durationDays: 5,
      priceFrom: 1850,
      currency: 'USD',
      maxGroupSize: 6,
      difficultyLevel: 'easy',
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
      type: 'mountain',
      shortDescription: 'Conquer Africa\'s highest peak via the scenic Machame Route',
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
          description: 'Drive to Machame Gate (1,800m). Begin trek through rainforest to Machame Camp (3,000m). 5-7 hours hiking.',
        },
        {
          day: 2,
          title: 'Machame Camp to Shira Camp',
          description: 'Trek from rainforest into moorland zone. Reach Shira Camp (3,840m). 4-6 hours hiking.',
        },
        {
          day: 3,
          title: 'Shira Camp to Barranco Camp',
          description: 'Acclimatization day. Climb to Lava Tower (4,600m), then descend to Barranco Camp (3,960m). 6-8 hours.',
        },
        {
          day: 4,
          title: 'Barranco Camp to Karanga Camp',
          description: 'Climb Barranco Wall, then trek to Karanga Camp (3,995m). 4-5 hours hiking.',
        },
        {
          day: 5,
          title: 'Karanga Camp to Barafu Camp',
          description: 'Trek to Barafu Camp (4,673m). Rest and prepare for summit attempt. 4-5 hours hiking.',
        },
        {
          day: 6,
          title: 'Summit Day - Uhuru Peak',
          description: 'Midnight start. Summit Uhuru Peak (5,895m) at sunrise. Descend to Mweka Camp (3,100m). 12-16 hours.',
        },
        {
          day: 7,
          title: 'Mweka Camp to Mweka Gate',
          description: 'Final descent through rainforest to Mweka Gate. Receive summit certificate. Return to hotel.',
        },
      ]),
      durationDays: 7,
      priceFrom: 2100,
      currency: 'USD',
      maxGroupSize: 12,
      difficultyLevel: 'challenging',
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
      type: 'beach',
      shortDescription: 'Relax on pristine white sand beaches in tropical paradise',
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
      durationDays: 5,
      priceFrom: 850,
      currency: 'USD',
      maxGroupSize: 20,
      difficultyLevel: 'easy',
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
        type: 'TEXT',
        description: 'Main site title for SEO',
      },
      {
        key: 'contact_email',
        value: 'info@exploriansafaris.com',
        type: 'TEXT',
        description: 'Primary contact email',
      },
      {
        key: 'contact_phone',
        value: '+255 719 245 540',
        type: 'TEXT',
        description: 'Primary contact phone',
      },
      {
        key: 'contact_address',
        value: 'Moshi, Kilimanjaro, Tanzania',
        type: 'TEXT',
        description: 'Business address',
      },
      {
        key: 'social_facebook',
        value: 'https://facebook.com/exploriansafaris',
        type: 'TEXT',
        description: 'Facebook page URL',
      },
      {
        key: 'social_instagram',
        value: 'https://instagram.com/explorian_safaris',
        type: 'TEXT',
        description: 'Instagram profile URL',
      },
      {
        key: 'social_twitter',
        value: 'https://twitter.com/exploriansafaris',
        type: 'TEXT',
        description: 'Twitter profile URL',
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
