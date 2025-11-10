'use client';

import { useState } from 'react';
import { Calendar, Search, Filter, MapPin, User, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function AdminAppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const appointments = [
    {
      id: 1,
      date: '2024-01-20',
      time: '09:00 AM',
      patient: 'Mama Achieng',
      user: 'Sarah Kimani',
      nurse: 'Mary Achieng',
      service: 'Blood pressure monitoring',
      location: 'Nakuru',
      cost: 2000,
      status: 'confirmed',
    },
    {
      id: 2,
      date: '2024-01-20',
      time: '11:30 AM',
      patient: 'Grandma Atieno',
      user: 'John Mwangi',
      nurse: 'Mary Achieng',
      service: 'Medication administration',
      location: 'Nakuru',
      cost: 2500,
      status: 'confirmed',
    },
    {
      id: 3,
      date: '2024-01-20',
      time: '02:00 PM',
      patient: 'Uncle Ochieng',
      user: 'Grace Ochieng',
      nurse: 'Jane Wanjiru',
      service: 'Post-operative care',
      location: 'Nairobi',
      cost: 3000,
      status: 'completed',
    },
    {
      id: 4,
      date: '2024-01-21',
      time: '10:00 AM',
      patient: 'Baba Kamau',
      user: 'David Kamau',
      nurse: 'Grace Otieno',
      service: 'Diabetes monitoring',
      location: 'Kisumu',
      cost: 2200,
      status: 'pending',
    },
  ];

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    revenue: appointments.reduce((sum, a) => sum + a.cost, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600 mt-2">Monitor all appointments across the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <Calendar className="h-8 w-8 text-purple-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600 mt-1">Total Appointments</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats.confirmed}</p>
          <p className="text-sm text-gray-600 mt-1">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <DollarSign className="h-8 w-8 text-orange-600 mb-2" />
          <p className="text-3xl font-bold text-gray-900">KES {stats.revenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Total Value</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Nurse</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Service</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">Cost</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{appointment.patient}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{appointment.user}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{appointment.nurse}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{appointment.service}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {appointment.location}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-sm font-semibold text-gray-900">
                    KES {appointment.cost.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : appointment.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}