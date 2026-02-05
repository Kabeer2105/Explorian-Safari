import TripPlannerSection from './TripPlannerSection';
import FeaturedPackages from '@/components/FeaturedPackages';
import ReviewsSection from './ReviewsSection';

/**
 * Home Page Sections - Server Component
 * Combines Trip Planner, Featured Packages, and Reviews sections
 * Individual sections use client components for translations
 */
export default function HomePageSections() {
  return (
    <>
      {/* Trip Planner Widget */}
      <TripPlannerSection />

      {/* Featured Packages (Server component with client wrapper for translations) */}
      <FeaturedPackages />

      {/* Customer Reviews Section */}
      <ReviewsSection />
    </>
  );
}
