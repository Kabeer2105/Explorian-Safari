import * as cheerio from 'cheerio';
import { prisma } from './prisma';

// TripAdvisor review scraping (public profile)
async function fetchTripAdvisorReviews() {
  const url = 'https://www.tripadvisor.ie/Attraction_Review-g317084-d25058164-Reviews-Explorian_Safaris-Moshi_Kilimanjaro_Region.html';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`TripAdvisor fetch failed: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const reviews: any[] = [];

    // TripAdvisor structure may change - this is a basic scraper
    $('.review-container').each((i, element) => {
      const $review = $(element);
      const authorName = $review.find('.info_text').text().trim();
      const ratingText = $review.find('.ui_bubble_rating').attr('class') || '';
      const rating = parseFloat(ratingText.match(/bubble_(\d+)/)?.[1] || '0') / 10;
      const reviewText = $review.find('.partial_entry').text().trim();
      const dateStr = $review.find('.ratingDate').attr('title') || '';

      if (authorName && rating && reviewText) {
        reviews.push({
          source: 'tripadvisor',
          externalId: `ta-${i}`,
          authorName,
          rating,
          reviewText,
          reviewDate: dateStr ? new Date(dateStr) : new Date(),
          lastSynced: new Date(),
          active: true,
        });
      }
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching TripAdvisor reviews:', error);
    return [];
  }
}

// Safari Bookings API (public reviews)
async function fetchSafariBookingsReviews() {
  const operatorId = 'p5449'; // Explorian Safaris operator ID
  const url = `https://www.safaribookings.com/api/v1/operators/${operatorId}/reviews`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      // Try scraping if API doesn't work
      return await scrapeSafariBookingsReviews();
    }

    const data = await response.json();
    const reviews = data.reviews?.map((review: any) => ({
      source: 'safaribookings',
      externalId: review.id?.toString() || `sb-${review.date}`,
      authorName: review.author || 'Anonymous',
      rating: parseFloat(review.rating) || 5,
      reviewText: review.text || review.comment || '',
      reviewDate: new Date(review.date),
      lastSynced: new Date(),
      active: true,
    })) || [];

    return reviews;
  } catch (error) {
    console.error('Error fetching Safari Bookings reviews:', error);
    return await scrapeSafariBookingsReviews();
  }
}

// Scrape Safari Bookings if API fails
async function scrapeSafariBookingsReviews() {
  const url = 'https://www.safaribookings.com/reviews/p5449';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Safari Bookings fetch failed: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const reviews: any[] = [];

    $('.review-item, .review').each((i, element) => {
      const $review = $(element);
      const authorName = $review.find('.review-author, .author-name').text().trim() || 'Anonymous';
      const ratingText = $review.find('.rating, .review-rating').text().trim();
      const rating = parseFloat(ratingText.match(/[\d.]+/)?.[0] || '5');
      const reviewText = $review.find('.review-text, .review-content').text().trim();
      const dateStr = $review.find('.review-date, .date').text().trim();

      if (reviewText) {
        reviews.push({
          source: 'safaribookings',
          externalId: `sb-scraped-${i}`,
          authorName,
          rating,
          reviewText,
          reviewDate: dateStr ? new Date(dateStr) : new Date(),
          lastSynced: new Date(),
          active: true,
        });
      }
    });

    return reviews;
  } catch (error) {
    console.error('Error scraping Safari Bookings reviews:', error);
    return [];
  }
}

// Sync all reviews to database
export async function syncReviews() {
  try {
    console.log('Starting review sync...');

    // Fetch from both sources
    const [tripAdvisorReviews, safariBookingsReviews] = await Promise.all([
      fetchTripAdvisorReviews(),
      fetchSafariBookingsReviews(),
    ]);

    const allReviews = [...tripAdvisorReviews, ...safariBookingsReviews];
    console.log(`Fetched ${allReviews.length} reviews total`);

    // Upsert reviews into database
    let syncedCount = 0;
    for (const review of allReviews) {
      try {
        await prisma.review.upsert({
          where: {
            id: review.externalId || `${review.source}-${Date.now()}-${syncedCount}`,
          },
          update: {
            ...review,
            lastSynced: new Date(),
          },
          create: {
            ...review,
            id: review.externalId || `${review.source}-${Date.now()}-${syncedCount}`,
          },
        });
        syncedCount++;
      } catch (error) {
        console.error('Error upserting review:', error);
        // Continue with next review
      }
    }

    console.log(`Synced ${syncedCount} reviews to database`);
    return {
      success: true,
      count: syncedCount,
      sources: {
        tripadvisor: tripAdvisorReviews.length,
        safaribookings: safariBookingsReviews.length,
      },
    };
  } catch (error) {
    console.error('Error syncing reviews:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      count: 0,
    };
  }
}

// Get reviews from database
export async function getReviews(limit = 10) {
  try {
    const reviews = await prisma.review.findMany({
      where: { active: true },
      orderBy: { reviewDate: 'desc' },
      take: limit,
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// Get review statistics
export async function getReviewStats() {
  try {
    const [totalReviews, avgRating, sourceBreakdown] = await Promise.all([
      prisma.review.count({ where: { active: true } }),
      prisma.review.aggregate({
        where: { active: true },
        _avg: { rating: true },
      }),
      prisma.review.groupBy({
        by: ['source'],
        where: { active: true },
        _count: true,
      }),
    ]);

    return {
      total: totalReviews,
      averageRating: avgRating._avg.rating || 0,
      sources: sourceBreakdown.reduce((acc, curr) => {
        acc[curr.source] = curr._count;
        return acc;
      }, {} as Record<string, number>),
    };
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return {
      total: 0,
      averageRating: 0,
      sources: {},
    };
  }
}
