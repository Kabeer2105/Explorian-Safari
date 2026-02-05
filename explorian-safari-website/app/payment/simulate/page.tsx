import { Suspense } from 'react';
import SimulateContent from './SimulateContent';

export default function SimulatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SimulateContent />
    </Suspense>
  );
}
