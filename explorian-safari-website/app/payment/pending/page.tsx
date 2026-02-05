import { Suspense } from 'react';
import PendingContent from './PendingContent';

export default function PendingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PendingContent />
    </Suspense>
  );
}
