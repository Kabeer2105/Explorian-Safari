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
          external_id: `ta-${i}`,
          author_name: authorName,
          rating,
          review_text: reviewText,
          review_date: dateStr ? new Date(dateStr) : new Date(),
          last_synced: new Date(),
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

  // Safari Bookings doesn't have a public API, go straight to scraping
  console.log('Fetching Safari Bookings reviews via scraping...');
  return await scrapeSafariBookingsReviews();
}

// Scrape Safari Bookings reviews
async function scrapeSafariBookingsReviews() {
  const url = 'https://www.safaribookings.com/p5449';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      console.error(`Safari Bookings fetch failed: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const reviews: any[] = [];

    console.log('Parsing Safari Bookings HTML...');

    // Try multiple selectors for reviews
    const reviewElements = $('.review-card, .review, article[data-testid="review"], .operator-review');
    console.log(`Found ${reviewElements.length} potential review elements`);

    reviewElements.each((i, element) => {
      const $review = $(element);

      // Try multiple selectors for each field
      const authorName =
        $review.find('.review-author').text().trim() ||
        $review.find('.author-name').text().trim() ||
        $review.find('[class*="author"]').text().trim() ||
        'Anonymous';

      const ratingText =
        $review.find('.rating').text().trim() ||
        $review.find('[class*="rating"]').attr('data-rating') ||
        $review.find('[class*="stars"]').attr('data-rating') ||
        '5';

      const rating = parseFloat(ratingText.match(/[\d.]+/)?.[0] || '5');

      const reviewText =
        $review.find('.review-text').text().trim() ||
        $review.find('.review-content').text().trim() ||
        $review.find('p').text().trim();

      const dateStr =
        $review.find('.review-date').text().trim() ||
        $review.find('.date').text().trim() ||
        $review.find('time').attr('datetime') ||
        '';

      console.log(`Review ${i}: author="${authorName}", rating=${rating}, text length=${reviewText.length}`);

      if (reviewText && reviewText.length > 10) {
        reviews.push({
          source: 'safaribookings',
          external_id: `sb-${i}-${Date.now()}`,
          author_name: authorName,
          rating,
          review_text: reviewText,
          review_date: dateStr ? new Date(dateStr) : new Date(),
          last_synced: new Date(),
          active: true,
        });
      }
    });

    console.log(`Successfully parsed ${reviews.length} Safari Bookings reviews`);
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
        const reviewId = review.external_id || `${review.source}-${Date.now()}-${syncedCount}`;

        await prisma.review.upsert({
          where: {
            id: reviewId,
          },
          update: {
            author_name: review.author_name,
            rating: review.rating,
            review_text: review.review_text,
            review_date: review.review_date,
            last_synced: new Date(),
            active: review.active,
          },
          create: {
            id: reviewId,
            source: review.source,
            external_id: review.external_id,
            author_name: review.author_name,
            rating: review.rating,
            review_text: review.review_text,
            review_date: review.review_date,
            last_synced: new Date(),
            active: review.active,
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
      orderBy: { review_date: 'desc' },
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
