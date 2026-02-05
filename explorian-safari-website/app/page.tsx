import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import HomePageSections from '@/components/home/HomePageSections';
import RestOfHomeContent from '@/components/home/RestOfHomeContent';

export const dynamic = 'force-dynamic';

/**
 * Home Page - Server Component
 * Combines client-side UI with server-side database content
 * Structure: Hero → Trust Bar → Trip Planner → Featured Packages → Reviews → Rest of Content
 */
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Trip Planner, Featured Packages, and Reviews Sections (with translations) */}
      <HomePageSections />

      {/* Rest of Home Page Content (Discover, Why Choose, Gallery, Videos, FAQ, CTA) */}
      <RestOfHomeContent />
    </>
  );
}
