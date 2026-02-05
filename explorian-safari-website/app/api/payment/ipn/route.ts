import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import initPesapal from '@/lib/pesapal';

// Instant Payment Notification (IPN) handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = body;

    console.log('IPN received:', body);

    if (!OrderTrackingId) {
      return NextResponse.json({ error: 'Missing OrderTrackingId' }, { status: 400 });
    }

    // Get payment status from Pesapal
    const pesapal = initPesapal();
    const status = await pesapal.getTransactionStatus(OrderTrackingId);

    // Find payment record
    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { pesapal_tracking_id: OrderTrackingId },
          { pesapal_merchant_reference: OrderMerchantReference || undefined },
        ],
      },
    });

    if (!payment) {
      console.error('Payment not found for IPN:', OrderTrackingId);
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Update payment status based on Pesapal response
    if (status.status === 'COMPLETED' || status.status === 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          payment_method: status.paymentMethod,
          paid_at: new Date(),
        },
      });

      // Update booking status
      await prisma.booking.update({
        where: { id: payment.booking_id },
        data: { status: 'PAID' },
      });

      console.log(`Payment completed: ${payment.id}`);
    } else if (status.status === 'FAILED' || status.status === 'CANCELLED') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      console.log(`Payment failed: ${payment.id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling IPN:', error);
    return NextResponse.json(
      { error: 'Failed to process IPN' },
      { status: 500 }
    );
  }
}

// GET method for IPN registration verification
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'IPN endpoint active' });
}
