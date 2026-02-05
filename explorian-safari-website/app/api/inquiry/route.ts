import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendInquiryConfirmation, sendInquiryNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, country, message, tripInterest, travelDates, numberOfGuests } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create inquiry in database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        country: country || null,
        message,
        trip_interest: tripInterest || null,
        travel_dates: travelDates || null,
        number_of_guests: numberOfGuests ? parseInt(numberOfGuests) : null,
        status: 'NEW',
      },
    });

    // Send confirmation email to customer (non-blocking)
    try {
      await sendInquiryConfirmation({
        name,
        email,
        message,
      });
    } catch (emailError) {
      console.error('Failed to send customer confirmation email:', emailError);
      // Continue anyway - inquiry is saved
    }

    // Send notification to admin (non-blocking)
    try {
      await sendInquiryNotification({
        name,
        email,
        phone: phone || 'Not provided',
        country: country || 'Not specified',
        message,
        tripInterest: tripInterest || 'General inquiry',
        travelDates: travelDates || 'Flexible',
        numberOfGuests: numberOfGuests || 'Not specified',
      });
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Continue anyway - inquiry is saved
    }

    return NextResponse.json({
      success: true,
      inquiry: {
        id: inquiry.id,
        status: inquiry.status,
      },
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
