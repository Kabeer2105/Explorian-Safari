'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Special case for dashboard - exact match only
    if (path === '/admin') {
      return pathname === '/admin';
    }
    // For other pages, match if starts with the path
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Bookings', path: '/admin/bookings', icon: '📅' },
    { name: 'Inquiries', path: '/admin/inquiries', icon: '✉️' },
    { name: 'Payments', path: '/admin/payments', icon: '💳' },
    { name: 'Packages', path: '/admin/packages', icon: '📦' },
    { name: 'Reviews', path: '/admin/reviews', icon: '⭐' },
    { name: 'FAQ', path: '/admin/faq', icon: '❓' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    { name: 'Translations', path: '/admin/translations', icon: '🌐' },
    { name: 'Content', path: '/admin/content', icon: '📝' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-primary to-primary-dark text-white shadow-2xl">
      {/* Header Section */}
      <div className="px-8 py-10 border-b border-white/10">
        <Link href="/admin" className="block text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">🦁</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold font-heading">Explorian Safaris</h1>
          <p className="text-sm text-white/80 mt-2">Admin Dashboard</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-4 mb-2 text-base font-medium rounded-xl transition-all ${
                active
                  ? 'bg-white text-primary shadow-lg transform scale-105'
                  : 'text-white/90 hover:bg-white/10 hover:text-white hover:translate-x-1'
              }`}
            >
              <span className="mr-4 text-2xl">{item.icon}</span>
              <span className={active ? 'font-semibold' : ''}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-8 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center px-6 py-3 mb-4 text-base text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <span className="mr-2">🌍</span>
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin-login' })}
          className="w-full px-6 py-4 text-base font-semibold text-white bg-secondary rounded-xl hover:bg-secondary/90 hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          <span className="mr-2">🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
