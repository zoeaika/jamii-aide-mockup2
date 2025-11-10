'use client';

import { useState } from 'react';
import { UserCheck, Search, Filter, Star, MapPin, Shield, Eye, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminNursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const nurses = [
    {
      id: 1,
      name: 'Mary Achieng',
      email: 'mary.a@example.com',
      phone: '+254 712 345 678',
      location: 'Nakuru',
      specializations: ['In-home care', 'Elderly care'],
      rating: 4.9,
      totalVisits: 72,
      earnings: 144000,
      status: 'verified',
      verificationDate: '2023-12-01',
    },
    {
      id: 2,
      name: 'Jane Wanjiru',
      email: 'jane.w@example.com',
      phone: '+254 723 456 789',
      location: 'Nairobi',
      specializations: ['Post-op care', 'Wound care'],
      rating: 4.8,
      totalVisits: 65,
      earnings: 130000,
      status: 'verified',
      verificationDate: '2023-11-15',
    },
    {
      id: 3,
      name: 'Grace Otieno',
      email: 'grace.o@example.com',
      phone: '+254 734 567 890',
      location: 'Kisumu',
      specializations: ['Diabetes care'],
      rating: 4.7,
      totalVisits: 58,
      earnings: 116000,
      status: 'verified',
      verificationDate: '2023-10-20',
    },
    {
      id: 4,
      name: 'Peter Kamau',
      email: 'peter.k@example.com',
      phone: '+254 745 678 901',
      location: 'Nakuru',
      specializations: ['In-home care'],
      rating: 0,
      totalVisits: 0,
      earnings: 0,
      status: 'pending',
      verificationDate: null,
    },
  ];

  const stats = {
    total: nurses.length,
    verified: nurses.filter(n => n.status === 'verified').length,
    pending: nurses.filter(n => n.status === 'pending').length,
    totalEarnings: nurses.reduce((sum, n) => sum + n.earnings, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nurse Management</h1>
          <p className="text-gray-600 mt-2">Verify and manage healthcare nurses</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>{stats.pending} Pending Verification</span>
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600 mt-1">Total Nurses</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.verified}</p>
          <p className="text-sm text-gray-600 mt-1">Verified</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
          <p className="text-sm text-gray-600 mt-1">Pending Review</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">KES {(stats.totalEarnings / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 mt-1">Total Earnings</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search nurses by name, location, or specialization..."
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
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Nurses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {nurses.map((nurse) => (
          <div
            key={nurse.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{nurse.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{nurse.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{nurse.location}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  nurse.status === 'verified'
                    ? 'bg-green-100 text-green-700'
                    : nurse.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {nurse.status === 'verified' && <CheckCircle className="h-3 w-3" />}
                {nurse.status === 'pending' && <Clock className="h-3 w-3" />}
                <span>{nurse.status}</span>
              </span>
            </div>

            {/* Specializations */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {nurse.specializations.map((spec, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            {nurse.status === 'verified' && (
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-bold text-gray-900">{nurse.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{nurse.totalVisits}</p>
                  <p className="text-xs text-gray-600">Visits</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">KES {(nurse.earnings / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-600">Earned</p>
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="text-sm text-gray-600 mb-4">
              <p>{nurse.email}</p>
              <p>{nurse.phone}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium text-sm flex items-center justify-center">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </button>
              {nurse.status === 'pending' && (
                <>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm">
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}