import { prisma } from '@/lib/prisma';
import ReviewsDisplay from './ReviewsDisplay';

export default async function Reviews() {
  const reviews = await prisma.review.findMany({
    where: { active: true },
    orderBy: { review_date: 'desc' },
    take: 6,
  });

  // Convert to plain objects to avoid serialization issues
  const plainReviews = reviews.map(review => ({
    id: review.id,
    author_name: review.author_name,
    rating: review.rating,
    review_text: review.review_text,
    review_date: review.review_date,
    source: review.source,
  }));

  return <ReviewsDisplay reviews={plainReviews} />;
}
