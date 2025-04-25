'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState } from '@/types/doctor';

interface URLParamsHandlerProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

export default function URLParamsHandler({ filterState, setFilterState }: URLParamsHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  useEffect(() => {
    setFilterState(prev => ({
      ...prev,
      searchQuery: searchParams.get('search') || '',
      consultationType: (searchParams.get('consultation') as 'Video Consult' | 'In Clinic' | null),
      specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
      sortBy: (searchParams.get('sortBy') as 'fees' | 'experience' | null),
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc' | null),
    }));
  }, [searchParams, setFilterState]);

  // Update URL with current filter state
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterState.searchQuery) {
      params.set('search', filterState.searchQuery);
    } else {
      params.delete('search');
    }
    
    if (filterState.consultationType) {
      params.set('consultation', filterState.consultationType);
    } else {
      params.delete('consultation');
    }
    
    if (filterState.specialties.length > 0) {
      params.set('specialties', filterState.specialties.join(','));
    } else {
      params.delete('specialties');
    }
    
    if (filterState.sortBy) {
      params.set('sortBy', filterState.sortBy);
    } else {
      params.delete('sortBy');
    }
    
    if (filterState.sortOrder) {
      params.set('sortOrder', filterState.sortOrder);
    } else {
      params.delete('sortOrder');
    }

    const newSearch = params.toString();
    const newPath = newSearch ? `?${newSearch}` : '';
    router.replace(newPath, { scroll: false });
  }, [filterState, router, searchParams]);

  return null;
} 