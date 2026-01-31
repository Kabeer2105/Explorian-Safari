import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import initPesapal from '@/lib/pesapal';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const merchantReference = searchParams.get('OrderMerchantReference');

    if (!orderTrackingId) {
      return redirect('/payment/error?message=Missing+order+tracking+ID');
    }

    // Get payment status from Pesapal
    const pesapal = initPesapal();
    const status = await pesapal.getTransactionStatus(orderTrackingId);

    // Find payment record
    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { pesapalTrackingId: orderTrackingId },
          { pesapalMerchantReference: merchantReference || undefined },
        ],
      },
      include: { booking: true },
    });

    if (!payment) {
      return redirect('/payment/error?message=Payment+not+found');
    }

    // Update payment status
    if (status.status === 'COMPLETED' || status.status === 'SUCCESS') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          paymentMethod: status.paymentMethod,
          paidAt: new Date(),
        },
      });

      // Update booking status
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'PAID' },
      });

      return redirect(`/payment/success?ref=${payment.booking.referenceNumber}`);
    } else if (status.status === 'FAILED' || status.status === 'CANCELLED') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      return redirect(`/payment/failed?ref=${payment.booking.referenceNumber}`);
    } else {
      // Still pending
      return redirect(`/payment/pending?ref=${payment.booking.referenceNumber}`);
    }
  } catch (error) {
    console.error('Error handling payment callback:', error);
    return redirect('/payment/error?message=Payment+processing+failed');
  }
}
