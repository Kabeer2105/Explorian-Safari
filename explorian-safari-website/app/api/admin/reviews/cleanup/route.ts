import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// DELETE old reviews without text
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete reviews with no text or very short text
    const result = await prisma.review.deleteMany({
      where: {
        OR: [
          { review_text: null },
          { review_text: '' },
        ],
      },
    });

    return NextResponse.json({
      message: `Deleted ${result.count} reviews without text`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error cleaning up reviews:', error);
    return NextResponse.json({ error: 'Failed to cleanup reviews' }, { status: 500 });
  }
}
