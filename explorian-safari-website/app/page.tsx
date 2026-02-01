import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import FeaturedPackages from '@/components/FeaturedPackages';
import RestOfHomeContent from '@/components/home/RestOfHomeContent';
import TripPlannerWidget from '@/components/TripPlannerWidget';
import Reviews from '@/components/Reviews';
import ReviewLinks from '@/components/ReviewLinks';

/**
 * Home Page - Server Component
 * Combines client-side UI with server-side database content
 * Structure: Hero → Trust Bar → Trip Planner → Featured Packages → Rest of Content
 */
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Trip Planner Widget */}
      <section className="section-padding bg-sand-light">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="section-label text-center">PLAN YOUR ADVENTURE</div>
            <h2 className="section-title text-center mb-12">Start Planning Your Dream Safari</h2>
            <TripPlannerWidget />
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <FeaturedPackages />

      {/* Customer Reviews Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="section-label">TESTIMONIALS</div>
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Real reviews from real adventures</p>

          <div className="mt-12">
            <Reviews />
          </div>

          <div className="mt-8 text-center">
            <ReviewLinks />
          </div>
        </div>
      </section>

      {/* Rest of Home Page Content (Discover, Why Choose, Gallery, Videos, FAQ, CTA) */}
      <RestOfHomeContent />
    </>
  );
}
