import React from "react";
import { Search } from "lucide-react";
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="mb-8 relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search news by title, keywords or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </div>
  );
}
