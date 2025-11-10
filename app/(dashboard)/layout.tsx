'use client';

import Link from 'next/link';
import { Heart, LayoutDashboard, Users, Calendar, Pill, FileText, Settings, CreditCard, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <Heart className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">Jamii Aide</span>
        </Link>
        
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 font-medium">PRIMARY USER</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">Demo User</p>
        </div>
        
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/family" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <Users className="h-5 w-5" />
            <span>Family Members</span>
          </Link>
          <Link href="/dashboard/appointments" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link href="/dashboard/prescriptions" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <Pill className="h-5 w-5" />
            <span>Prescriptions</span>
          </Link>
          <Link href="/dashboard/billing" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <CreditCard className="h-5 w-5" />
            <span>Billing</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
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