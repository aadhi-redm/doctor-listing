'use client';

import { Doctor } from '@/types/doctor';

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Doctors List"
    >
      {doctors.map(doctor => (
        <article
          key={doctor.id}
          data-testid="doctor-card"
          className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
          tabIndex={0}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center" aria-hidden="true">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 data-testid="doctor-name" className="text-lg font-semibold text-gray-900">
                  {doctor.name}
                </h2>
                <p data-testid="doctor-specialty" className="text-sm text-gray-600">
                  {doctor.specialties.join(', ')}
                </p>
              </div>
            </div>
            
            <dl className="space-y-2">
              <div className="flex items-center text-sm">
                <dt className="sr-only">Experience</dt>
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <dd data-testid="doctor-experience" className="text-gray-600">
                  {doctor.experience} years of experience
                </dd>
              </div>
              
              <div className="flex items-center text-sm">
                <dt className="sr-only">Consultation Fee</dt>
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <dd data-testid="doctor-fee" className="text-gray-600">
                  Consultation Fee: ₹{doctor.fees}
                </dd>
              </div>

              <div className="flex items-center text-sm">
                <dt className="sr-only">Consultation Type</dt>
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <dd className="text-gray-600">
                  {doctor.consultationType}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
      
      {doctors.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg border border-gray-100" role="alert">
          <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
} 