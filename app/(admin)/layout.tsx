'use client';

import Link from 'next/link';
import { Heart, LayoutDashboard, Users, UserCheck, Calendar, DollarSign, Settings, Shield, LogOut, AlertCircle } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Jamii Aide Admin</h1>
                <p className="text-xs text-purple-200">System Management Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-purple-200">administrator@jamii.com</p>
              </div>
              <Link href="/login" className="p-2 hover:bg-white/10 rounded-lg transition">
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-1">
            <Link href="/admin/dashboard" className="px-6 py-4 border-b-2 border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition">
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Overview</span>
              </div>
            </Link>
            <Link href="/admin/users" className="px-6 py-4 border-b-2 border-transparent text-gray-600 font-medium hover:bg-gray-50 hover:text-purple-600 transition">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Users</span>
              </div>
            </Link>
            <Link href="/admin/nurses" className="px-6 py-4 border-b-2 border-transparent text-gray-600 font-medium hover:bg-gray-50 hover:text-purple-600 transition">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Nurses</span>
              </div>
            </Link>
            <Link href="/admin/appointments" className="px-6 py-4 border-b-2 border-transparent text-gray-600 font-medium hover:bg-gray-50 hover:text-purple-600 transition">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </div>
            </Link>
            <Link href="/admin/payments" className="px-6 py-4 border-b-2 border-transparent text-gray-600 font-medium hover:bg-gray-50 hover:text-purple-600 transition">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Payments</span>
              </div>
            </Link>
            <Link href="/admin/settings" className="px-6 py-4 border-b-2 border-transparent text-gray-600 font-medium hover:bg-gray-50 hover:text-purple-600 transition">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}