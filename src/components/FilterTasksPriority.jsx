import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterTasksPriority({ tasks, setFilteredTasks }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const priorities = ["High", "Medium", "Low"];

  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    setShowDropdown(false);

    if (priority === "") {
      const filtered = tasks.filter((task) => !task.checked);
      setFilteredTasks(filtered);
    } else {
      const filtered = tasks.filter(
        (task) => task.priority === priority && !task.checked
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="relative inline-block text-left ml-auto">
      {/* Filter button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex justify-between items-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none transition-colors"
      >
        {selectedPriority || "Filter by Priority"}
        <ChevronDown size={18} className="ml-2" />
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
       
          <div className="py-1  origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-50">
            {priorities.map((priority) => (
              <button
                key={priority}
                onClick={() => handleSelect(priority)}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors
                  ${selectedPriority === priority ?
                    "bg-gradient-to-r from-blue-500  to-purple-400 text-white" : 
                    "text-gray-700 hover:bg-blue-100 hover:text-gray-900"}
                `}
              >
                {priority}
              </button>
            ))}
            <button
              onClick={() => handleSelect("")}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors
                  ${selectedPriority === "" ?
                    "bg-gradient-to-r from-blue-500  to-purple-400 text-white " : 
                    "text-gray-500 hover:bg-blue-100 hover:text-gray-900"}
                `}
            >
              All
            </button>
          </div>
      
      )}
    </div>
  );
}