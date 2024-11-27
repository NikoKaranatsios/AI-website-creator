import React from 'react';
import { useEditStore } from '../store/editStore';
import { Pencil, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { editMode, toggleEditMode } = useEditStore();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">AI-Editable Website</h1>
          <button
            onClick={toggleEditMode}
            className={`flex items-center px-4 py-2 rounded-md ${
              editMode
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {editMode ? (
              <>
                <X className="w-4 h-4 mr-2" /> Exit Edit Mode
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" /> Enter Edit Mode
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};