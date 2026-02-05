import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET all translations for an entity
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entity_type');
    const entityId = searchParams.get('entity_id');
    const language = searchParams.get('language');

    const where: any = {};
    if (entityType) where.entity_type = entityType;
    if (entityId) where.entity_id = entityId;
    if (language) where.language = language;

    const translations = await prisma.translation.findMany({
      where,
      orderBy: [
        { entity_type: 'asc' },
        { entity_id: 'asc' },
        { field: 'asc' },
        { language: 'asc' },
      ],
    });

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}

// POST create/update translation
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { entity_type, entity_id, field, language, value } = await request.json();

    if (!entity_type || !entity_id || !field || !language || value === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upsert (create or update if exists)
    const translation = await prisma.translation.upsert({
      where: {
        entity_type_entity_id_field_language: {
          entity_type,
          entity_id,
          field,
          language,
        },
      },
      update: {
        value,
        updated_at: new Date(),
      },
      create: {
        entity_type,
        entity_id,
        field,
        language,
        value,
      },
    });

    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Error saving translation:', error);
    return NextResponse.json(
      { error: 'Failed to save translation' },
      { status: 500 }
    );
  }
}

// DELETE translation
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Translation ID required' }, { status: 400 });
    }

    await prisma.translation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting translation:', error);
    return NextResponse.json(
      { error: 'Failed to delete translation' },
      { status: 500 }
    );
  }
}
