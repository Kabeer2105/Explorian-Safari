import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// This endpoint is used to complete simulated payments (when Pesapal credentials are not configured)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantReference, success } = body;

    if (!merchantReference) {
      return NextResponse.json(
        { error: 'Merchant reference is required' },
        { status: 400 }
      );
    }

    // Find payment by merchant reference
    const payment = await prisma.payment.findFirst({
      where: { pesapalMerchantReference: merchantReference },
      include: { booking: true },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    if (success) {
      // Mark payment as completed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          paymentMethod: 'Simulated Payment',
          paidAt: new Date(),
        },
      });

      // Update booking status
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'PAID' },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment completed successfully',
        bookingReference: payment.booking.referenceNumber,
      });
    } else {
      // Mark payment as failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      return NextResponse.json({
        success: false,
        message: 'Payment failed',
        bookingReference: payment.booking.referenceNumber,
      });
    }
  } catch (error) {
    console.error('Error completing simulated payment:', error);
    return NextResponse.json(
      { error: 'Failed to complete simulated payment' },
      { status: 500 }
    );
  }
}
