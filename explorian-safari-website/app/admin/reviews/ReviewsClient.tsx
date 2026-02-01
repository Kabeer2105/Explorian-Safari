'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Review = {
  id: string;
  source: string;
  author_name: string;
  rating: number;
  review_text: string | null;
  review_date: Date;
  external_id: string | null;
  last_synced: Date | null;
  active: boolean;
  created_at: Date;
};

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState<string | null>(null);

  const stats = {
    total: reviews.length,
    tripadvisor: reviews.filter((r) => r.source === 'tripadvisor').length,
    safaribookings: reviews.filter((r) => r.source === 'safaribookings').length,
    manual: reviews.filter((r) => r.source === 'manual').length,
    avgRating:
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
        : 0,
  };

  const handleToggleVisibility = async (id: string, currentActive: boolean) => {
    setLoading(id);
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      // Update local state
      setReviews(
        reviews.map((r) => (r.id === id ? { ...r, active: !currentActive } : r))
      );
    } catch (error) {
      console.error('Error toggling review visibility:', error);
      alert('Failed to update review visibility');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setLoading(id);
    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete review');
      }

      // Update local state
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (error: any) {
      console.error('Error deleting review:', error);
      alert(error.message || 'Failed to delete review');
    } finally {
      setLoading(null);
    }
  };

  const handleSyncReviews = async () => {
    setLoading('sync');
    try {
      const response = await fetch('/api/reviews/sync', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync reviews');
      }

      alert('Reviews synced successfully!');
      router.refresh();
    } catch (error) {
      console.error('Error syncing reviews:', error);
      alert('Failed to sync reviews');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="mt-2 text-gray-600">Manage customer reviews and ratings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSyncReviews}
            disabled={loading === 'sync'}
            className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition disabled:opacity-50"
          >
            {loading === 'sync' ? 'Syncing...' : 'Sync Reviews'}
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">
            Add Manual Review
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Average Rating</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.avgRating} ⭐</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">TripAdvisor</p>
          <p className="text-2xl font-bold text-green-600">{stats.tripadvisor}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Safari Bookings</p>
          <p className="text-2xl font-bold text-blue-600">{stats.safaribookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Manual</p>
          <p className="text-2xl font-bold text-purple-600">{stats.manual}</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No reviews yet. Sync reviews from external sources or add manual reviews.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.author_name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-semibold">
                        {Number(review.rating).toFixed(1)}
                      </span>
                      <span className="text-yellow-500 ml-1">⭐</span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        review.source === 'tripadvisor'
                          ? 'bg-green-100 text-green-800'
                          : review.source === 'safaribookings'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {review.source}
                    </span>
                    {!review.active && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{review.review_text}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>Review Date: {new Date(review.review_date).toLocaleDateString()}</span>
                    {review.last_synced && (
                      <>
                        <span>•</span>
                        <span>Last Synced: {new Date(review.last_synced).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {review.source === 'manual' && (
                    <button className="px-3 py-1 text-sm text-primary hover:text-primary-dark">
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleVisibility(review.id, review.active)}
                    disabled={loading === review.id}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 disabled:opacity-50"
                  >
                    {loading === review.id ? '...' : review.active ? 'Hide' : 'Show'}
                  </button>
                  {review.source === 'manual' && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={loading === review.id}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {loading === review.id ? '...' : 'Delete'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
