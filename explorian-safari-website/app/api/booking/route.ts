import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendBookingConfirmation, sendBookingNotificationToAdmin, sendUrgentBookingInquiry } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      packageId,
      customerName,
      email,
      phone,
      country,
      travelDate,
      numberOfGuests,
      guestDetails,
      specialRequests,
    } = body;

    // Validate required fields
    if (!customerName || !email || !phone || !travelDate || !numberOfGuests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate days until travel
    const travelDateObj = new Date(travelDate);
    const today = new Date();
    const daysUntilTravel = Math.ceil(
      (travelDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Generate reference number
    const referenceNumber = `EXP-${Date.now().toString(36).toUpperCase()}`;

    // Determine booking status based on 7-day rule
    const isUrgent = daysUntilTravel < 7;
    const status = isUrgent ? 'INQUIRY' : 'PENDING';

    // Get package details if packageId provided
    let packageDetails = null;
    if (packageId) {
      packageDetails = await prisma.package.findUnique({
        where: { id: packageId },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        packageId: packageId || null,
        referenceNumber,
        customerName,
        email,
        phone,
        country,
        travelDate: travelDateObj,
        numberOfGuests,
        guestDetails: guestDetails ? JSON.stringify(guestDetails) : null,
        totalAmount: packageDetails
          ? Number(packageDetails.priceFrom) * numberOfGuests
          : null,
        currency: packageDetails?.currency || 'USD',
        specialRequests,
        status,
      },
    });

    // Send appropriate emails
    if (isUrgent) {
      // Send "we'll contact you" email
      await sendUrgentBookingInquiry({
        customerName,
        email,
        phone,
        referenceNumber,
        packageName: packageDetails?.name || 'Custom Package',
        travelDate: travelDateObj.toDateString(),
        numberOfGuests,
      });

      // Send urgent notification to admin
      await sendBookingNotificationToAdmin({
        ...booking,
        packageName: packageDetails?.name || 'Custom Package',
        urgent: true,
      });
    } else {
      // Send regular booking confirmation with payment instructions
      await sendBookingConfirmation({
        customerName,
        email,
        referenceNumber,
        packageName: packageDetails?.name || 'Custom Package',
        travelDate: travelDateObj.toDateString(),
        numberOfGuests,
        totalAmount: booking.totalAmount?.toString() || '0',
        currency: booking.currency,
      });

      // Send admin notification
      await sendBookingNotificationToAdmin({
        ...booking,
        packageName: packageDetails?.name || 'Custom Package',
        urgent: false,
      });
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        referenceNumber: booking.referenceNumber,
        status: booking.status,
        isUrgent,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
