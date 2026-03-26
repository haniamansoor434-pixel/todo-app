import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex-1">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-4 pr-4 py-2 rounded-xl border border-gray-300 hover:border-cyan-500 outline-none"
      />
    </div>
  );
}