import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/packages - Get all active packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { active: true },
      orderBy: [
        { type: 'asc' },
        { created_at: 'desc' }
      ],
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        duration_days: true,
        price_from: true,
        currency: true,
        images: true,
        badge_label: true,
      }
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
