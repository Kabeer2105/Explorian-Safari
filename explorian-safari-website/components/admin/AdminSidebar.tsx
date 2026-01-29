'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
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
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white">
      <div className="p-6">
        <Link href="/admin" className="block">
          <h1 className="text-2xl font-bold">Explorian Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Safari Management</p>
        </Link>
      </div>

      <nav className="px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Link
          href="/"
          target="_blank"
          className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition mb-2"
        >
          🌍 View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin-login' })}
          className="w-full px-3 py-2 text-sm text-left text-gray-400 hover:text-white transition"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
