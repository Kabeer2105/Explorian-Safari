import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import FeaturedPackages from '@/components/FeaturedPackages';
import RestOfHomeContent from '@/components/home/RestOfHomeContent';

/**
 * Home Page - Server Component
 * Combines client-side UI with server-side database content
 * Structure: Hero → Trust Bar → Featured Packages → Rest of Content
 */
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Featured Packages - RIGHT AFTER HERO/TRUST BAR */}
      <FeaturedPackages />

      {/* Rest of Home Page Content (Trip Planner, Discover, Why Choose, Testimonials, Gallery, Videos, FAQ, CTA) */}
      <RestOfHomeContent />
    </>
  );
}
