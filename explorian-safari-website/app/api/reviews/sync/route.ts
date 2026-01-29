import { NextRequest, NextResponse } from 'next/server';
import { syncReviews } from '@/lib/reviews';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting review sync...');
    const result = await syncReviews();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully synced ${result.count} reviews`,
        sources: result.sources,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      { error: 'Failed to sync reviews' },
      { status: 500 }
    );
  }
}
