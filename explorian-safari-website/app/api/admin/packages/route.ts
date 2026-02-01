import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all packages
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const active = searchParams.get('active');

    const where: any = {};
    if (type) where.type = type;
    if (active !== null) where.active = active === 'true';

    const packagesRaw = await prisma.package.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    // Explicitly convert Decimal fields to numbers
    const packages = packagesRaw.map(pkg => ({
      ...pkg,
      price_from: pkg.price_from ? Number(pkg.price_from) : null,
    }));

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

// POST new package
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      type,
      description,
      highlights,
      inclusions,
      exclusions,
      itinerary,
      images,
      badge_label,
      duration_days,
      price_from,
      currency,
      max_group_size,
      difficulty_level,
      active,
      featured,
    } = body;

    // Validate required fields
    if (!name || !slug || !type || !description || !duration_days || !price_from) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.package.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Package with this slug already exists' },
        { status: 400 }
      );
    }

    const newPackage = await prisma.package.create({
      data: {
        name,
        slug,
        type,
        description,
        highlights,
        inclusions,
        exclusions,
        itinerary,
        images,
        badge_label,
        duration_days: parseInt(duration_days),
        price_from: parseFloat(price_from),
        currency: currency || 'USD',
        max_group_size: max_group_size ? parseInt(max_group_size) : null,
        difficulty_level: difficulty_level || null,
        active: active !== false,
        featured: featured === true,
      },
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { error: 'Failed to create package' },
      { status: 500 }
    );
  }
}
