'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, User, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type Appointment = {
  id: string;
  scheduledDate: string;
  status: string;
  appointmentType: string;
  totalCost: number;
  familyMember: { name: string };
  chw: { user: { name: string } };
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-700';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">Manage Healthcare Nurse visits and appointments</p>
        </div>
        <Link
          href="/dashboard/appointments/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2 shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Book Nurse Visit</span>
        </Link>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Book your first Healthcare Nurse visit to start providing care for your family members.
          </p>
          <Link
            href="/dashboard/appointments/new"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>Book Your First Visit</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Date and Time */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-lg text-gray-900">
                      {new Date(appointment.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(appointment.scheduledDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Family Member and Healthcare Nurse */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Family Member</p>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="font-medium text-gray-900">{appointment.familyMember.name}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Healthcare Nurse</p>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="font-medium text-gray-900">{appointment.chw.user.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Type */}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                      {appointment.appointmentType.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Status and Cost */}
                <div className="text-right ml-6">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium mb-3 ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span>{appointment.status}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">KES {appointment.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Total Cost</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
