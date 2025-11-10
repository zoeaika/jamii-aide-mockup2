'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, DollarSign, Star, ArrowLeft, CheckCircle } from 'lucide-react';

export default function NewAppointmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    familyMember: '',
    serviceType: '',
    nurse: '',
    date: '',
    time: '',
    notes: '',
  });

  const familyMembers = [
    { id: '1', name: 'Mama Achieng', age: 68 },
    { id: '2', name: 'Grandma Atieno', age: 82 },
    { id: '3', name: 'Uncle Ochieng', age: 75 },
  ];

  const serviceTypes = [
    { id: 'vitals', name: 'Vital Signs Check', price: 2000, duration: '30 min' },
    { id: 'medication', name: 'Medication Administration', price: 2500, duration: '45 min' },
    { id: 'wound', name: 'Wound Care', price: 3000, duration: '1 hour' },
    { id: 'postop', name: 'Post-Operative Care', price: 3500, duration: '1 hour' },
    { id: 'diabetes', name: 'Diabetes Monitoring', price: 2200, duration: '45 min' },
  ];

  const nurses = [
    { id: '1', name: 'Mary Achieng', rating: 4.9, visits: 72, distance: '2.1 km', specialties: ['Elderly care', 'Diabetes'] },
    { id: '2', name: 'Jane Wanjiru', rating: 4.8, visits: 65, distance: '3.5 km', specialties: ['Post-op care', 'Wound care'] },
    { id: '3', name: 'Grace Otieno', rating: 4.7, visits: 58, distance: '4.2 km', specialties: ['In-home care', 'Medication'] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard/appointments');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/appointments"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Appointments
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Book Nurse Visit</h1>
        <p className="text-gray-600 mt-2">Schedule a healthcare nurse appointment</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, title: 'Family Member' },
            { num: 2, title: 'Service & Nurse' },
            { num: 3, title: 'Date & Time' },
            { num: 4, title: 'Confirm' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="h-6 w-6" /> : s.num}
                </div>
                <span className="text-xs font-medium text-gray-600 mt-2">{s.title}</span>
              </div>
              {idx < 3 && (
                <div className={`flex-1 h-1 mx-4 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Step 1: Select Family Member */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Select Family Member</h2>
            <div className="grid grid-cols-1 gap-4">
              {familyMembers.map((member) => (
                <label
                  key={member.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    formData.familyMember === member.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="familyMember"
                    value={member.id}
                    checked={formData.familyMember === member.id}
                    onChange={(e) => setFormData({ ...formData, familyMember: e.target.value })}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.age} years old</p>
                    </div>
                  </div>
                  {formData.familyMember === member.id && (
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Service & Nurse */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Service Type */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Service</h2>
              <div className="grid grid-cols-1 gap-4">
                {serviceTypes.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.serviceType === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.id}
                      checked={formData.serviceType === service.id}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">KES {service.price.toLocaleString()}</p>
                      {formData.serviceType === service.id && (
                        <CheckCircle className="h-5 w-5 text-blue-600 ml-auto mt-1" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Nurse */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Nurse</h2>
              <div className="grid grid-cols-1 gap-4">
                {nurses.map((nurse) => (
                  <label
                    key={nurse.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.nurse === nurse.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="nurse"
                      value={nurse.id}
                      checked={formData.nurse === nurse.id}
                      onChange={(e) => setFormData({ ...formData, nurse: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <span className="text-white font-bold">{nurse.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{nurse.name}</p>
                          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{nurse.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{nurse.visits} visits</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{nurse.distance}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {nurse.specialties.map((spec, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {formData.nurse === nurse.id && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows={4}
                placeholder="Any special instructions or concerns..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Confirm Booking</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                <span className="text-gray-700">Family Member:</span>
                <span className="font-semibold text-gray-900">
                  {familyMembers.find((m) => m.id === formData.familyMember)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                <span className="text-gray-700">Service:</span>
                <span className="font-semibold text-gray-900">
                  {serviceTypes.find((s) => s.id === formData.serviceType)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                <span className="text-gray-700">Nurse:</span>
                <span className="font-semibold text-gray-900">
                  {nurses.find((n) => n.id === formData.nurse)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-200">
                <span className="text-gray-700">Date & Time:</span>
                <span className="font-semibold text-gray-900">
                  {formData.date && new Date(formData.date).toLocaleDateString()} at {formData.time}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-semibold text-gray-900">Total Cost:</span>
                <span className="text-2xl font-bold text-blue-600">
                  KES {serviceTypes.find((s) => s.id === formData.serviceType)?.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !formData.familyMember) ||
                (step === 2 && (!formData.serviceType || !formData.nurse)) ||
                (step === 3 && (!formData.date || !formData.time))
              }
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>{isLoading ? 'Booking...' : 'Confirm Booking'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}