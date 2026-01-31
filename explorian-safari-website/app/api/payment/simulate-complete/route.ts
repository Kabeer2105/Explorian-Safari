import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/email';

// This endpoint is used to complete simulated payments (when Pesapal credentials are not configured)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const isSuccess = status === 'success';

    // Find or create payment record
    let payment = await prisma.payment.findFirst({
      where: { booking_id: bookingId },
    });

    if (!payment) {
      // Create payment record
      const merchantRef = `SIM-${Date.now().toString(36).toUpperCase()}`;
      const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}`;
      payment = await prisma.payment.create({
        data: {
          booking_id: bookingId,
          transaction_id: transactionId,
          amount: booking.total_amount || 0,
          currency: booking.currency,
          status: isSuccess ? 'COMPLETED' : 'FAILED',
          payment_method: 'Simulated Payment',
          pesapal_merchant_reference: merchantRef,
          paid_at: isSuccess ? new Date() : null,
          updated_at: new Date(),
        },
      });
    } else {
      // Update existing payment
      payment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: isSuccess ? 'COMPLETED' : 'FAILED',
          payment_method: 'Simulated Payment',
          paid_at: isSuccess ? new Date() : null,
          updated_at: new Date(),
        },
      });
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: isSuccess ? 'PAID' : 'PENDING',
        updated_at: new Date(),
      },
    });

    // Send confirmation email if payment succeeded
    if (isSuccess) {
      try {
        await sendBookingConfirmation(updatedBooking, payment);
      } catch (emailError) {
        console.error('Email sending failed (payment still completed):', emailError);
        // Continue anyway - payment was successful
      }
    }

    return NextResponse.json({
      success: isSuccess,
      message: isSuccess ? 'Payment completed successfully' : 'Payment failed',
      booking: {
        reference_number: booking.reference_number,
      },
    });
  } catch (error) {
    console.error('Error completing simulated payment:', error);
    return NextResponse.json(
      { error: 'Failed to complete simulated payment' },
      { status: 500 }
    );
  }
}
