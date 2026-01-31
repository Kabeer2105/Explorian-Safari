import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/admin-login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand/20 via-white to-savanna/10">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-10 ml-72">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
