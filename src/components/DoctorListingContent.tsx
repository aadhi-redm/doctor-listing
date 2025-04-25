'use client';

import { useState, useEffect, Suspense } from 'react';
import { Doctor, FilterState } from '@/types/doctor';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import URLParamsHandler from '@/components/URLParamsHandler';
import { useDebounce } from '@/hooks/useDebounce';

const transformDoctorData = (apiDoctor: any): Doctor => {
  return {
    id: apiDoctor.id,
    name: apiDoctor.name,
    specialties: apiDoctor.specialities?.map((s: any) => s.name) || [],
    experience: parseInt(apiDoctor.experience) || 0,
    fees: parseInt(apiDoctor.fees?.replace(/[^0-9]/g, '')) || 0,
    consultationType: apiDoctor.video_consult && !apiDoctor.in_clinic 
      ? 'Video Consult' 
      : !apiDoctor.video_consult && apiDoctor.in_clinic 
        ? 'In Clinic'
        : apiDoctor.video_consult && apiDoctor.in_clinic 
          ? 'Video Consult' // Default to Video Consult if both are available
          : 'In Clinic' // Default to In Clinic if neither is specified
  };
};

const validateDoctor = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    Array.isArray(data.specialities) &&
    typeof data.experience === 'string' &&
    typeof data.fees === 'string'
  );
};

export default function DoctorListingContent() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    consultationType: null,
    specialties: [],
    sortBy: null,
    sortOrder: null,
  });

  const debouncedSearchQuery = useDebounce(filterState.searchQuery, 300);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors data');
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid API response format: expected an array');
        }

        // Validate and transform the data
        const validDoctors = data
          .filter(validateDoctor)
          .map(transformDoctorData);

        if (validDoctors.length === 0) {
          throw new Error('No valid doctor data found in the API response');
        }

        if (validDoctors.length < data.length) {
          console.warn(`Some doctor records (${data.length - validDoctors.length}) were invalid and filtered out`);
        }

        setDoctors(validDoctors);
        setFilteredDoctors(validDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...doctors];

    // Search filter (using debounced value)
    if (debouncedSearchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Consultation type filter
    if (filterState.consultationType) {
      result = result.filter(doctor => doctor.consultationType === filterState.consultationType);
    }

    // Specialties filter
    if (filterState.specialties.length > 0) {
      result = result.filter(doctor =>
        filterState.specialties.some(specialty => doctor.specialties.includes(specialty))
      );
    }

    // Sort
    if (filterState.sortBy) {
      result.sort((a, b) => {
        if (filterState.sortBy === 'fees') {
          return filterState.sortOrder === 'asc' ? a.fees - b.fees : b.fees - a.fees;
        } else if (filterState.sortBy === 'experience') {
          return filterState.sortOrder === 'asc' ? a.experience - b.experience : b.experience - a.experience;
        }
        return 0;
      });
    }

    setFilteredDoctors(result);
  }, [doctors, filterState, debouncedSearchQuery]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading URL params...</div>}>
        <URLParamsHandler filterState={filterState} setFilterState={setFilterState} />
      </Suspense>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a Doctor</h1>
          <div className="mb-8">
            <SearchBar
              value={filterState.searchQuery}
              onChange={(value) => setFilterState(prev => ({ ...prev, searchQuery: value }))}
              suggestions={doctors.map(d => d.name)}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64 flex-shrink-0">
              <FilterPanel
                filterState={filterState}
                setFilterState={setFilterState}
                specialties={Array.from(new Set(doctors.flatMap(d => d.specialties)))}
              />
            </div>
            <div className="flex-1">
              <DoctorList doctors={filteredDoctors} />
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
} 