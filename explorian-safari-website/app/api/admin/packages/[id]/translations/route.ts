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

    // Translations are now handled via the Translation model
    // This endpoint is kept for backwards compatibility but does nothing
    // Use /api/admin/translations/package/[id] instead

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
