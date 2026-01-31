import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET single package
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const packageData = await prisma.package.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Booking: true },
        },
      },
    });

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

// DELETE package
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if package has bookings
    const packageData = await prisma.package.findUnique({
      where: { id },
      include: {
        _count: {
          select: { Booking: true },
        },
      },
    });

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    if (packageData._count.Booking > 0) {
      return NextResponse.json(
        { error: 'Cannot delete package with existing bookings. Please deactivate instead.' },
        { status: 400 }
      );
    }

    // Delete the package
    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}

// PUT/PATCH update package
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
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
      duration_days,
      price_from,
      currency,
      max_group_size,
      difficulty_level,
      active,
      featured,
    } = body;

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        name,
        slug,
        type,
        description,
        highlights,
        inclusions,
        exclusions,
        itinerary,
        duration_days: duration_days ? parseInt(duration_days) : null,
        price_from: price_from ? parseFloat(price_from) : null,
        currency,
        max_group_size: max_group_size ? parseInt(max_group_size) : null,
        difficulty_level,
        active: active === true || active === 'true',
        featured: featured === true || featured === 'true',
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}
