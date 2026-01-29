import BookingForm from '@/components/forms/BookingForm';

export default function BookPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Safari</h1>
            <p className="text-lg text-gray-600">
              Fill in the details below to reserve your adventure. We'll confirm your booking within 24 hours.
            </p>
          </div>

          <BookingForm />

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">📞 Need Help?</h3>
            <p className="text-gray-700">
              Contact us on WhatsApp: <a href="https://wa.me/255719245540" className="text-primary font-semibold">+255 719 245 540</a>
            </p>
            <p className="text-gray-700 mt-2">
              Email: <a href="mailto:info@exploriansafaris.com" className="text-primary font-semibold">info@exploriansafaris.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
