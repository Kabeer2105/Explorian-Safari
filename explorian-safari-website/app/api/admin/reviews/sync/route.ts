import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { syncReviews } from '@/lib/reviews';

// Trigger review sync
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Admin triggered review sync');
    const result = await syncReviews();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      { error: 'Failed to sync reviews' },
      { status: 500 }
    );
  }
}
