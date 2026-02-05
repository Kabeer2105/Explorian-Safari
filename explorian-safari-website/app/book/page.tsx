import { Suspense } from 'react';
import BookingPageContent from '@/components/pages/BookingPageContent';

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
