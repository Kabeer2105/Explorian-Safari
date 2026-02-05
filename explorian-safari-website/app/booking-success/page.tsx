import { Suspense } from 'react';
import BookingSuccessContent from './BookingSuccessContent';

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
