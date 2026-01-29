import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📍</div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">Moshi, Kilimanjaro, Tanzania</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📞</div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">+255 719 245 540</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">info@exploriansafaris.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💬</div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <a
                        href="https://wa.me/255719245540"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monday - Friday:</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Saturday:</span>
                    <span className="text-gray-600">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sunday:</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Emergency support available 24/7 for active safaris
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
