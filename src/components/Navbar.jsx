// src/components/Navbar.jsx
import React from "react";
import SearchBar from "./Searchbar";

export default function Navbar({ setOpenPopup, search, setSearch }) {
  return (
    <div className="bg-white/80 flex h-20 px-8 py-6 items-center">
      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* New Task Button */}
      <button
        className="ml-6 h-10 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-cyan-500/40 transition-all duration-200"
        onClick={() => setOpenPopup(true)}
      >
        + New Task
      </button>
    </div>
  );
}