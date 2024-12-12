import React from 'react';
import type { SearchType } from '../types/search';

interface SearchTypeSelectorProps {
  selectedType: SearchType;
  onTypeChange: (type: SearchType) => void;
}

export function SearchTypeSelector({ selectedType, onTypeChange }: SearchTypeSelectorProps) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onTypeChange('siren')}
        className={`px-4 py-2 rounded-md transition-colors ${
          selectedType === 'siren'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        SIREN
      </button>
      <button
        onClick={() => onTypeChange('siret')}
        className={`px-4 py-2 rounded-md transition-colors ${
          selectedType === 'siret'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        SIRET
      </button>
    </div>
  );
}