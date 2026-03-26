import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex-1 min-w-0">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 md:py-2 rounded-lg sm:rounded-xl border border-gray-300 hover:border-cyan-500 focus:border-cyan-500 outline-none text-xs sm:text-sm md:text-base transition-colors"
      />
    </div>
  );
}