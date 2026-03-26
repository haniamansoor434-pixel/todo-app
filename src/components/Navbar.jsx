// src/components/Navbar.jsx
import React from "react";
import SearchBar from "./Searchbar";
import { Menu } from "lucide-react";

export default function Navbar({ setOpenPopup, search, setSearch, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="bg-white/80 flex gap-2 sm:gap-3 md:gap-4 h-14 sm:h-16 md:h-20 px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-6 items-center">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden text-gray-700 hover:text-gray-900 flex-shrink-0 p-1"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* New Task Button */}
      <button
        className="flex-shrink-0 h-8 sm:h-9 md:h-10 flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-medium text-xs sm:text-sm md:text-base shadow-lg hover:shadow-cyan-500/40 transition-all duration-200 whitespace-nowrap"
        onClick={() => setOpenPopup(true)}
      >
        <span className="hidden sm:inline">+</span> New
      </button>
    </div>
  );
}