'use client';

import { FilterState } from '@/types/doctor';

interface FilterPanelProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  specialties: string[];
}

export default function FilterPanel({ filterState, setFilterState, specialties }: FilterPanelProps) {
  const handleConsultationTypeChange = (type: 'Video Consult' | 'In Clinic') => {
    setFilterState(prev => ({
      ...prev,
      consultationType: prev.consultationType === type ? null : type,
    }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    setFilterState(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSortChange = (sortBy: 'fees' | 'experience') => {
    setFilterState(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSpecialtyTestId = (specialty: string): string => {
    if (!specialty) return 'filter-specialty-unknown';
    return `filter-specialty-${specialty.toString().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div>
        <h3 data-testid="filter-header-moc" className="text-lg font-semibold text-gray-900 mb-4">
          Consultation Mode
        </h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              data-testid="filter-video-consult"
              checked={filterState.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              data-testid="filter-in-clinic"
              checked={filterState.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 data-testid="filter-header-speciality" className="text-lg font-semibold text-gray-900 mb-4">
          Specialties
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 -mr-2">
          {specialties.map((specialty, index) => (
            <label key={`${specialty}-${index}`} className="flex items-center">
              <input
                type="checkbox"
                data-testid={getSpecialtyTestId(specialty)}
                checked={filterState.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 data-testid="filter-header-sort" className="text-lg font-semibold text-gray-900 mb-4">
          Sort By
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handleSortChange('fees')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 ${
              filterState.sortBy === 'fees' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Fees {filterState.sortBy === 'fees' && (
              <span className="ml-1">{filterState.sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => handleSortChange('experience')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 ${
              filterState.sortBy === 'experience' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Experience {filterState.sortBy === 'experience' && (
              <span className="ml-1">{filterState.sortOrder === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 