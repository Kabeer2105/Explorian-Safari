import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all active FAQs
export async function GET(request: NextRequest) {
  try {
    const faqs = await prisma.faq.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        order: true,
      },
    });

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
