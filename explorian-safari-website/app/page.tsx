import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import FeaturedPackages from '@/components/FeaturedPackages';
import RestOfHomeContent from '@/components/home/RestOfHomeContent';
import TripPlannerWidget from '@/components/TripPlannerWidget';

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

      {/* Rest of Home Page Content (Discover, Why Choose, Testimonials, Gallery, Videos, FAQ, CTA) */}
      <RestOfHomeContent />
    </>
  );
}
