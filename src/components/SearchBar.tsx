import React, { useState } from "react";
import { Search } from "lucide-react";
import { SearchType } from "../types/search";
import { searchConfigs } from "../utils/searchConfig";

interface SearchBarProps {
  onSearch: (value: string, type: SearchType) => void;
  isLoading: boolean;
  searchType: SearchType;
}

export function SearchBar({ onSearch, isLoading, searchType }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const config = searchConfigs[searchType];

  const validateInput = (value: string) => {
    return config.pattern.test(value.replace(/\s+/g, "").trim()); // Valide sans espaces
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s+/g, " ").trim(); // Supprime espaces multiples
    setValue(inputValue);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "") // Supprime TOUS les espaces collés
      .trim();
    setValue(pastedText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedValue = value.replace(/\s+/g, "").trim(); // Nettoyage final
    if (!validateInput(cleanedValue)) {
      setError(config.errorMessage);
      return;
    }

    onSearch(cleanedValue, searchType);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={config.placeholder}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={config.maxLength}
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Recherche..." : "Rechercher"}
        </button>
      </form>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
