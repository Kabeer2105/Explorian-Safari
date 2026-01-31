import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all reviews (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      orderBy: { reviewDate: 'desc' },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST new manual review
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { authorName, rating, reviewText, reviewDate } = body;

    if (!authorName || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'Author name, rating, and review text are required' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        source: 'manual',
        authorName,
        rating: parseFloat(rating),
        reviewText,
        reviewDate: reviewDate ? new Date(reviewDate) : new Date(),
        active: true,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
