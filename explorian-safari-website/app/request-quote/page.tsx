import RequestQuoteForm from '@/components/forms/RequestQuoteForm';

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Travel Offer</h1>
            <p className="text-lg text-gray-600">
              Tell us about your dream safari and we'll create a customized itinerary with transparent pricing, just for you.
            </p>
          </div>

          <RequestQuoteForm />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-semibold mb-2">Free Quote</h3>
              <p className="text-sm text-gray-600">No obligation, completely free personalized itinerary</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Fast Response</h3>
              <p className="text-sm text-gray-600">We'll get back to you within 24 hours with a detailed offer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Tailored to You</h3>
              <p className="text-sm text-gray-600">Custom itineraries designed around your interests and budget</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
