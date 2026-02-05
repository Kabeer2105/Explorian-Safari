'use client';

interface Review {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  review_date: Date;
  source: string;
}

interface ReviewsDisplayProps {
  reviews: Review[];
}

export default function ReviewsDisplay({ reviews }: ReviewsDisplayProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-4">{review.review_text}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-semibold text-gray-900">{review.author_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.review_date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {review.source}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
