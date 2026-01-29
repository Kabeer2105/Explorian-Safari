import { NextRequest, NextResponse } from 'next/server';
import { getReviews, getReviewStats } from '@/lib/reviews';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const stats = searchParams.get('stats') === 'true';

    if (stats) {
      const reviewStats = await getReviewStats();
      return NextResponse.json(reviewStats);
    }

    const reviews = await getReviews(limit);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
