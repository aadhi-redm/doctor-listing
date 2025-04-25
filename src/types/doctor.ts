export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  experience: number;
  fees: number;
  consultationType: 'Video Consult' | 'In Clinic';
}

export interface FilterState {
  searchQuery: string;
  consultationType: 'Video Consult' | 'In Clinic' | null;
  specialties: string[];
  sortBy: 'fees' | 'experience' | null;
  sortOrder: 'asc' | 'desc' | null;
} 