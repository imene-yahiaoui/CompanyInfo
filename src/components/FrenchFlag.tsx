import React from "react";

export function FrenchFlag() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-4">
        <div className="w-2 bg-blue-700"></div>
        <div className="w-2 bg-white"></div>
        <div className="w-2 bg-red-600"></div>
      </div>
      <span className="text-sm text-gray-600">
        Entreprises françaises uniquement
      </span>
    </div>
  );
}
