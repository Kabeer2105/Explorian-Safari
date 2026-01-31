import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import initPesapal from '@/lib/pesapal';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!booking.totalAmount) {
      return NextResponse.json({ error: 'Booking has no amount' }, { status: 400 });
    }

    // Initialize Pesapal
    const pesapal = initPesapal();

    // Submit order to Pesapal
    const paymentData = await pesapal.submitOrder({
      amount: Number(booking.totalAmount),
      currency: booking.currency,
      description: `Payment for ${booking.package?.name || 'Safari Booking'} - ${booking.referenceNumber}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/callback`,
      cancellationUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`,
      billingAddress: {
        emailAddress: booking.email,
        phoneNumber: booking.phone,
        countryCode: booking.country || 'TZ',
        firstName: booking.customerName.split(' ')[0],
        lastName: booking.customerName.split(' ').slice(1).join(' ') || booking.customerName,
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: Number(booking.totalAmount),
        currency: booking.currency,
        status: 'PENDING',
        pesapalMerchantReference: paymentData.merchantReference,
        pesapalTrackingId: paymentData.orderTrackingId,
      },
    });

    return NextResponse.json({
      success: true,
      redirectUrl: paymentData.redirectUrl,
      orderTrackingId: paymentData.orderTrackingId,
      merchantReference: paymentData.merchantReference,
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}
