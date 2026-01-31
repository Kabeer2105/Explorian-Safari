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
        tripInterest: tripInterest || null,
        travelDates: travelDates || null,
        numberOfGuests: numberOfGuests ? parseInt(numberOfGuests) : null,
        status: 'NEW',
      },
    });

    // Send confirmation email to customer
    await sendInquiryConfirmation({
      name,
      email,
      message,
    });

    // Send notification to admin
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
