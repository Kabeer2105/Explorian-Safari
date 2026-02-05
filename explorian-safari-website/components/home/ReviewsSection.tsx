import ReviewsSectionHeader from './ReviewsSectionHeader';
import Reviews from '@/components/Reviews';
import ReviewLinks from '@/components/ReviewLinks';

/**
 * Reviews Section - Server Component
 * Combines translated header (client) with reviews data (server)
 */
export default function ReviewsSection() {
  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        <ReviewsSectionHeader />

        <div className="mt-12">
          <Reviews />
        </div>

        <div className="mt-8 text-center">
          <ReviewLinks />
        </div>
      </div>
    </section>
  );
}
