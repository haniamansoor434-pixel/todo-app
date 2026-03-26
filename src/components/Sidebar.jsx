import { ListTodo, Calendar, CheckCircle, Star } from "lucide-react";

export default function Sidebar({ active, setActive, onClose }) {
  const handleClick = (taskName) => {
    setActive(taskName);
    if (onClose) onClose();
  };

  return (
    <div className="bg-white/80 w-full h-full flex flex-col p-3 sm:p-4">
      <h1 className="p-2 sm:p-3 mb-3 sm:mb-4 md:mb-6 border-b text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
        Task Manager
      </h1>

      <div className="flex flex-col gap-2 sm:gap-3">

        <button
          className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
            active === "All Tasks"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white"
          }`}
          onClick={() => handleClick("All Tasks")}
        >
          <ListTodo size={18} className="sm:w-5 sm:h-5" />
          <span>All Tasks</span>
        </button>

        <button
          className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
            active === "Today Tasks"
              ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gradient-to-r from-purple-400 to-purple-500 hover:text-white"
          }`}
          onClick={() => handleClick("Today Tasks")}
        >
          <Calendar size={18} className="sm:w-5 sm:h-5" />
          <span>Today Tasks</span>
        </button>

        <button
          className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
            active === "Completed Tasks"
              ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gradient-to-r from-green-400 to-green-500 hover:text-white"
          }`}
          onClick={() => handleClick("Completed Tasks")}
        >
          <CheckCircle size={18} />
          Completed Tasks
        </button>

        <button
          className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all ${
            active === "Important Tasks"
              ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gradient-to-r from-orange-400 to-red-500 hover:text-white"
          }`}
          onClick={() => handleClick("Important Tasks")}
        >
          <Star size={18} className="sm:w-5 sm:h-5" />
          <span>Important Tasks</span>
        </button>

      </div>
    </div>
  );
}