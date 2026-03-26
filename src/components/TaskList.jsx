import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";
import EditTask from "./EditTask";
import FilterTasksPriority from "./FilterTasksPriority";

export default function TaskList({ tasks, successMsg, setSuccessMsg, showChecked = false }) {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(showChecked ? tasks : tasks.filter((t) => !t.checked));
  }, [tasks, showChecked]);

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setSuccessMsg("Task deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setTaskToDelete(null);
    }
  };

  const toggleChecked = async (task) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        checked: !task.checked,
      });
      if (!task.checked) {
        setSuccessMsg(`Task "${task.text}" completed successfully!`);
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Filter div on the right */}
      <div className="flex justify-end mb-4 px-4">
        <FilterTasksPriority tasks={tasks} setFilteredTasks={setFilteredTasks} />
      </div>

      {/* Task list */}
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between bg-white/80 shadow-sm hover:shadow-md transition-shadow rounded-xl p-3 sm:p-4 md:p-5 mx-2 sm:mx-3 md:mx-5 my-2 sm:my-3"
        >
          {/* LEFT - Checkbox and Task Text */}
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={task.checked || false}
              onChange={() => toggleChecked(task)}
              className="w-4 h-4 sm:w-5 sm:h-5 border rounded-md accent-green-600 cursor-pointer flex-shrink-0 mt-0.5 sm:mt-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm sm:text-base text-gray-800 font-medium break-words line-clamp-3">
                {task.text}
              </p>
            </div>
          </div>

          {/* RIGHT - Priority, Status, Edit, Delete */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 flex-wrap">
            <span
              className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full text-white whitespace-nowrap font-medium
                ${task.priority === "High" ? "bg-red-500" : ""}
                ${task.priority === "Medium" ? "bg-orange-400" : ""}
                ${task.priority === "Low" ? "bg-blue-400" : ""}
              `}
            >
              {task.priority || "Low"}
            </span>

            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {task.checked ? "Done" : "In Progress"}
            </span>

            <EditTask task={task} setSuccessMsg={setSuccessMsg} />

            <button
              onClick={() => setTaskToDelete(task)}
              className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 p-1"
              aria-label="Delete task"
            >
              <Trash size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 w-full sm:w-full sm:max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Delete Task</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 break-words">
              Are you sure you want to delete "{taskToDelete.text}"?
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base font-medium transition-colors"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm sm:text-base font-medium transition-colors"
                onClick={() => deleteTask(taskToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 bg-green-500 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-lg z-50 animate-fadeInOut text-sm sm:text-base max-w-sm">
          {successMsg}
        </div>
      )}
    </>
  );
}