import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
        package_id: packageId || null,
        reference_number: referenceNumber,
        customer_name: customerName,
        email,
        phone,
        country,
        travel_date: travelDateObj,
        number_of_guests: numberOfGuests,
        guest_details: guestDetails ? JSON.stringify(guestDetails) : null,
        total_amount: packageDetails
          ? Number(packageDetails.price_from) * numberOfGuests
          : null,
        currency: packageDetails?.currency || 'USD',
        special_requests: specialRequests,
        status,
        updated_at: new Date(),
      },
    });

    // Send appropriate emails (wrapped in try-catch to not block booking)
    try {
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
        // For bookings >= 7 days, confirmation email will be sent after payment
        // Just send admin notification for now
        await sendBookingNotificationToAdmin({
          ...booking,
          packageName: packageDetails?.name || 'Custom Package',
          urgent: false,
        });
      }
    } catch (emailError) {
      console.error('Email sending failed (booking still created):', emailError);
      // Continue anyway - booking was created successfully
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        reference_number: booking.reference_number,
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
