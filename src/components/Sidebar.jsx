import { ListTodo, Calendar, CheckCircle, Star } from "lucide-react";

export default function Sidebar({ active, setActive }) {

  return (
    <div className="bg-white/80 w-60 min-h-screen p-4 ">

      <h1 className="w-55 p-3 mb-6 border-b text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
        Task Manager
      </h1>

      <div className="flex flex-col space-y-4">

        <button
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            active === "All Tasks"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              : "bg-gray-200 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white"
          }`}
          onClick={() => setActive("All Tasks")}
        >
          <ListTodo size={18} />
          All Tasks
        </button>

        <button
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            active === "Today Tasks"
              ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white"
              : "bg-gray-200 hover:bg-gradient-to-r from-purple-400 to-purple-500 text hover:text-white"
          }`}
          onClick={() => setActive("Today Tasks")}
        >
          <Calendar size={18} />
          Today Tasks
        </button>

        <button
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            active === "Completed Tasks"
              ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
              : "bg-gray-200 hover:bg-gradient-to-r from-green-400 to-green-500 hover:text-white"
          }`}
          onClick={() => setActive("Completed Tasks")}
        >
          <CheckCircle size={18} />
          Completed Tasks
        </button>

        <button
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            active === "Important Tasks"
              ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
              : "bg-gray-200 hover:bg-gradient-to-r from-orange-400 to-red-500  hover:text-white"
          }`}
          onClick={() => setActive("Important Tasks")}
        >
          <Star size={18} />
          Important Tasks
        </button>

      </div>
    </div>
  );
}