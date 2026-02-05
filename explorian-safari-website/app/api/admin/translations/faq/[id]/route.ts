import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { saveTranslations } from '@/lib/translations-db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { translations } = body;

    if (!Array.isArray(translations)) {
      return NextResponse.json({ error: 'Invalid translations format' }, { status: 400 });
    }

    // Save translations to database
    await saveTranslations('faq', id, translations);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving FAQ translations:', error);
    return NextResponse.json(
      { error: 'Failed to save translations' },
      { status: 500 }
    );
  }
}
