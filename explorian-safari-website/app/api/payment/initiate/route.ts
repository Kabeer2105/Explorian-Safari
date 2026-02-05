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
      include: { Package: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!booking.total_amount) {
      return NextResponse.json({ error: 'Booking has no amount' }, { status: 400 });
    }

    // Initialize Pesapal
    const pesapal = initPesapal();

    // Submit order to Pesapal
    const paymentData = await pesapal.submitOrder({
      amount: Number(booking.total_amount),
      currency: booking.currency,
      description: `Payment for ${booking.Package?.name || 'Safari Booking'} - ${booking.reference_number}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/callback`,
      cancellationUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/failed`,
      billingAddress: {
        emailAddress: booking.email,
        phoneNumber: booking.phone || '',
        countryCode: booking.country || 'TZ',
        firstName: booking.customer_name.split(' ')[0],
        lastName: booking.customer_name.split(' ').slice(1).join(' ') || booking.customer_name,
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: Number(booking.total_amount),
        currency: booking.currency,
        status: 'PENDING',
        pesapal_merchant_reference: paymentData.merchantReference,
        pesapal_tracking_id: paymentData.orderTrackingId,
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
