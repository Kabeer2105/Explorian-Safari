import nodemailer from 'nodemailer';

// Create transporter using cPanel SMTP
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'mail.exploriansafaris.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER || 'info@exploriansafaris.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Send inquiry confirmation to customer
export async function sendInquiryConfirmation(to: string, name: string, inquiryType: string) {
  const mailOptions = {
    from: '"Explorian Safaris" <info@exploriansafaris.com>',
    to,
    subject: 'Thank You for Your Inquiry - Explorian Safaris',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4d2f;">Thank You for Your Inquiry!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in ${inquiryType}. We have received your inquiry and our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our website or reach out to us via WhatsApp at +255 719 245 540.</p>
        <p>Best regards,<br>The Explorian Safaris Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Explorian Safaris | Moshi, Kilimanjaro, Tanzania<br>
          Email: info@exploriansafaris.com | Phone: +255 719 245 540
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send inquiry notification to admin
export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  trip_interest?: string;
  travel_dates?: string;
}) {
  const mailOptions = {
    from: '"Explorian Website" <info@exploriansafaris.com>',
    to: process.env.ADMIN_EMAIL || 'info@exploriansafaris.com',
    subject: '🔔 New Inquiry Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4d2f;">New Inquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.phone || 'N/A'}</td></tr>
          ${inquiry.trip_interest ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Trip Interest:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.trip_interest}</td></tr>` : ''}
          ${inquiry.travel_dates ? `<tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Dates:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.travel_dates}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${inquiry.message}</td></tr>
        </table>
        <p style="margin-top: 20px;">Please respond to this inquiry within 24 hours.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send urgent booking inquiry (< 7 days)
export async function sendUrgentBookingInquiry(booking: any) {
  // Send to customer
  await transporter.sendMail({
    from: '"Explorian Safaris" <info@exploriansafaris.com>',
    to: booking.email,
    subject: 'Your Safari Booking Request - Explorian Safaris',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4d2f;">Thank You for Your Booking Request!</h2>
        <p>Dear ${booking.customer_name},</p>
        <p>We have received your booking request for travel on ${new Date(booking.travel_date).toLocaleDateString()}.</p>
        <p><strong>Reference Number:</strong> ${booking.reference_number}</p>
        <p>Since your travel date is less than 7 days away, our team will reach out to you shortly to arrange your booking and discuss payment options.</p>
        <p>For immediate assistance, please contact us on WhatsApp at +255 719 245 540.</p>
        <p>Best regards,<br>The Explorian Safaris Team</p>
      </div>
    `,
  });

  // Send to admin
  await transporter.sendMail({
    from: '"Explorian Website" <info@exploriansafaris.com>',
    to: process.env.ADMIN_EMAIL || 'info@exploriansafaris.com',
    subject: '🚨 URGENT: Booking Request (< 7 days)',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #e85d04;">URGENT: Booking Request</h2>
        <p>A customer has requested a booking for travel in less than 7 days. Please contact them immediately.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Reference:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.reference_number}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.customer_name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(booking.travel_date).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.number_of_guests}</td></tr>
        </table>
      </div>
    `,
  });
}

// Send booking confirmation (≥ 7 days, after payment)
export async function sendBookingConfirmation(booking: any, payment: any) {
  const mailOptions = {
    from: '"Explorian Safaris" <info@exploriansafaris.com>',
    to: booking.email,
    subject: `Booking Confirmed - ${booking.reference_number}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4d2f;">Booking Confirmed!</h2>
        <p>Dear ${booking.customer_name},</p>
        <p>Your safari booking has been confirmed. We look forward to hosting you!</p>
        <h3>Booking Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Reference Number:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.reference_number}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(booking.travel_date).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Number of Guests:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.number_of_guests}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Amount:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.currency} ${booking.total_amount}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Payment Status:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${payment.status}</td></tr>
        </table>
        <p style="margin-top: 20px;">We will send you a detailed itinerary and pre-departure information 7 days before your trip.</p>
        <p>For any questions, contact us at info@exploriansafaris.com or WhatsApp +255 719 245 540.</p>
        <p>Best regards,<br>The Explorian Safaris Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send booking notification to admin
export async function sendBookingNotificationToAdmin(booking: any) {
  const mailOptions = {
    from: '"Explorian Website" <info@exploriansafaris.com>',
    to: process.env.ADMIN_EMAIL || 'info@exploriansafaris.com',
    subject: `📅 New Booking Received - ${booking.reference_number}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2a4d2f;">New Booking Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Reference:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.reference_number}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Customer:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.customer_name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Travel Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(booking.travel_date).toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Guests:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.number_of_guests}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.currency} ${booking.total_amount}</td></tr>
        </table>
        <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/bookings/${booking.id}" style="background: #2a4d2f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Booking</a></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
