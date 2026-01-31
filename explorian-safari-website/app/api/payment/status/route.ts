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
        where: { pesapalTrackingId: orderTrackingId },
        include: { booking: true },
      });
    } else if (bookingId) {
      payment = await prisma.payment.findFirst({
        where: { bookingId },
        include: { booking: true },
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
        paymentMethod: payment.paymentMethod,
        paidAt: payment.paidAt,
        booking: {
          referenceNumber: payment.booking.referenceNumber,
          status: payment.booking.status,
        },
      });
    }

    // Check status with Pesapal if still pending
    const pesapal = initPesapal();
    const status = await pesapal.getTransactionStatus(payment.pesapalTrackingId!);

    // Update if status changed
    if (status.status === 'COMPLETED' || status.status === 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          paymentMethod: status.paymentMethod,
          paidAt: new Date(),
        },
      });

      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'PAID' },
      });

      return NextResponse.json({
        status: 'COMPLETED',
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: status.paymentMethod,
        paidAt: new Date(),
        booking: {
          referenceNumber: payment.booking.referenceNumber,
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
          referenceNumber: payment.booking.referenceNumber,
          status: payment.booking.status,
        },
      });
    }

    // Still pending
    return NextResponse.json({
      status: 'PENDING',
      amount: payment.amount,
      currency: payment.currency,
      booking: {
        referenceNumber: payment.booking.referenceNumber,
        status: payment.booking.status,
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
