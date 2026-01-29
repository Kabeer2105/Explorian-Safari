import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--earth-dark)', color: 'white', margin: 0, padding: 0 }}>
      <div className="container mx-auto px-4 lg:px-8" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-4">Explorian Safaris</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Family-owned safari company with 20+ years experience. Licensed by the Ministry of Natural Resources and Tourism Tanzania.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/exploriansafaris"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="https://www.instagram.com/explorian_safaris/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/safaris" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Safari Packages
                </Link>
              </li>
              <li>
                <Link href="/mountains" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mountain Treks
                </Link>
              </li>
              <li>
                <Link href="/beaches" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beach Holidays
                </Link>
              </li>
              <li>
                <Link href="/day-trips" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Day Trips
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Partners */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-4">Our Partners</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.safaribookings.com/p5449"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Safari Bookings
                </a>
              </li>
              <li>
                <a
                  href="https://safarideal.com/travel-partner/explorian-safaris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  SafariDeal.com
                </a>
              </li>
              <li>
                <a
                  href="https://safariopedia.com/Operators/Explorian-Safaris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Safariopedia
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <span className="mt-1">📧</span>
                <a href="mailto:info@exploriansafaris.com" className="hover:text-white transition-colors">
                  info@exploriansafaris.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span className="mt-1">📞</span>
                <div>
                  <a href="tel:+255719245540" className="hover:text-white transition-colors block">
                    +255 719 245 540
                  </a>
                  <a href="tel:+255754605665" className="hover:text-white transition-colors block">
                    +255 754 605 665
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span className="mt-1">📍</span>
                <span>
                  P.O. Box 906<br />
                  Moshi, Kilimanjaro<br />
                  Tanzania
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>
            Copyright © {currentYear} Explorian Safaris. All Rights Reserved. | Licensed Tour Operator
          </p>
        </div>
      </div>
    </footer>
  );
}
