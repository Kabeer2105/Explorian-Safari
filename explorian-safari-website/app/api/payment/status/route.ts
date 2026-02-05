import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import initPesapal from '@/lib/pesapal';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderTrackingId = searchParams.get('orderTrackingId');
    const bookingId = searchParams.get('bookingId');

    if (!orderTrackingId && !bookingId) {
      return NextResponse.json(
        { error: 'Either orderTrackingId or bookingId is required' },
        { status: 400 }
      );
    }

    // Find payment
    let payment;
    if (orderTrackingId) {
      payment = await prisma.payment.findFirst({
        where: { pesapal_tracking_id: orderTrackingId },
        include: { Booking: true },
      });
    } else if (bookingId) {
      payment = await prisma.payment.findFirst({
        where: { bookingId },
        include: { Booking: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // If payment is already completed or failed, return cached status
    if (payment.status === 'COMPLETED' || payment.status === 'FAILED') {
      return NextResponse.json({
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        payment_method: payment.payment_method,
        paid_at: payment.paid_at,
        booking: {
          reference_number: payment.Booking.reference_number,
          status: payment.Booking.status,
        },
      });
    }

    // Check status with Pesapal if still pending
    const pesapal = initPesapal();
    const status = await pesapal.getTransactionStatus(payment.pesapal_tracking_id!);

    // Update if status changed
    if (status.status === 'COMPLETED' || status.status === 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          payment_method: status.paymentMethod,
          paid_at: new Date(),
        },
      });

      await prisma.booking.update({
        where: { id: payment.booking_id },
        data: { status: 'PAID' },
      });

      return NextResponse.json({
        status: 'COMPLETED',
        amount: payment.amount,
        currency: payment.currency,
        payment_method: status.paymentMethod,
        paid_at: new Date(),
        booking: {
          reference_number: payment.Booking.reference_number,
          status: 'PAID',
        },
      });
    } else if (status.status === 'FAILED' || status.status === 'CANCELLED') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      return NextResponse.json({
        status: 'FAILED',
        amount: payment.amount,
        currency: payment.currency,
        booking: {
          reference_number: payment.Booking.reference_number,
          status: payment.Booking.status,
        },
      });
    }

    // Still pending
    return NextResponse.json({
      status: 'PENDING',
      amount: payment.amount,
      currency: payment.currency,
      booking: {
        reference_number: payment.Booking.reference_number,
        status: payment.Booking.status,
      },
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
