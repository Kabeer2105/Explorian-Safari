import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { attachTranslationsToMany } from '@/lib/translations-db';

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

    // Attach translations
    const faqsWithTranslations = await attachTranslationsToMany('faq', faqs);

    return NextResponse.json({ faqs: faqsWithTranslations });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
