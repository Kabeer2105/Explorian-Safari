import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Update package translations
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const {
      name_i18n,
      description_i18n,
      highlights_i18n,
      inclusions_i18n,
      exclusions_i18n,
      itinerary_i18n,
    } = body;

    await prisma.package.update({
      where: { id },
      data: {
        name_i18n,
        description_i18n,
        highlights_i18n,
        inclusions_i18n,
        exclusions_i18n,
        itinerary_i18n,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Translations saved successfully',
    });
  } catch (error) {
    console.error('Error saving package translations:', error);
    return NextResponse.json(
      { error: 'Failed to save translations' },
      { status: 500 }
    );
  }
}
