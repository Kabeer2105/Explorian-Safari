import { Suspense } from 'react';
import FailedContent from './FailedContent';

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}
