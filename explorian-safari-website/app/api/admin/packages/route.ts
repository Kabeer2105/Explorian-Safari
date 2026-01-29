import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all packages
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const active = searchParams.get('active');

    const where: any = {};
    if (type) where.type = type;
    if (active !== null) where.active = active === 'true';

    const packages = await prisma.package.findMany({
      where,
      orderBy: { createdAt: 'desc' },
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

// POST new package
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      type,
      shortDescription,
      description,
      highlights,
      inclusions,
      exclusions,
      itinerary,
      durationDays,
      priceFrom,
      currency,
      images,
      maxGroupSize,
      difficultyLevel,
      active,
      featured,
    } = body;

    // Validate required fields
    if (!name || !slug || !type || !description || !durationDays || !priceFrom) {
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
        shortDescription,
        description,
        highlights,
        inclusions,
        exclusions,
        itinerary,
        durationDays: parseInt(durationDays),
        priceFrom: parseFloat(priceFrom),
        currency: currency || 'USD',
        images,
        maxGroupSize: maxGroupSize ? parseInt(maxGroupSize) : null,
        difficultyLevel,
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
