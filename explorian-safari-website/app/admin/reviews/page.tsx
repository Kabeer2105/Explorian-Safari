import { prisma } from '@/lib/prisma';
import ReviewsClient from './ReviewsClient';

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { review_date: 'desc' },
  });

  return <ReviewsClient initialReviews={reviews} />;
}
