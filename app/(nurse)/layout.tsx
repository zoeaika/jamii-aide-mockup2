'use client';

import Link from 'next/link';
import { Heart, LayoutDashboard, Calendar, Users, DollarSign, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <Heart className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold">Jamii Aide</span>
        </Link>
        
        <div className="mb-6 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-green-600 font-medium">HEALTHCARE NURSE</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">Nurse Mary</p>
        </div>
        
        <nav className="space-y-2">
          <Link 
            href="/nurse/dashboard" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive('/nurse/dashboard')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/nurse/schedule" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive('/nurse/schedule')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule</span>
          </Link>
          <Link 
            href="/nurse/patients" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive('/nurse/patients')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>My Patients</span>
          </Link>
          <Link 
            href="/nurse/earnings" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive('/nurse/earnings')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <DollarSign className="h-5 w-5" />
            <span>Earnings</span>
          </Link>
          <Link 
            href="/nurse/profile" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive('/nurse/profile')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link href="/login" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}