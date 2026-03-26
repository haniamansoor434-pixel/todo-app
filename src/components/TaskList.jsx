import React, { useState } from "react";
import { Trash } from "lucide-react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../../firebase";

export default function TaskList({ tasks, successMsg, setSuccessMsg,showChecked=false }) {
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Permanently delete task from Firestore
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

  // Mark task as completed (checked) without deleting from Firestore
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
      {(showChecked ? tasks : tasks.filter((task) => !task.checked)).map((task)  => (
          <div
            key={task.id}
            className="flex items-center h-20 justify-between bg-white/80 shadow-sm hover:shadow-md transition rounded-xl px-5 py-4 m-5 "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4 flex-1">
              <input
                type="checkbox"
                checked={task.checked || false}
                onChange={() => toggleChecked(task)}
                className="w-5 h-5 border rounded-md accent-green-600 cursor-pointer"
              />
              <div className="flex flex-col w-170">
                <p className="text-gray-800 font-medium">{task.text}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-3 py-1 rounded-full text-white
                  ${task.priority === "High" ? "bg-red-500 " : ""}
                  ${task.priority === "Medium" ? "bg-orange-400" : ""}
                  ${task.priority === "Low" ? "bg-blue-400" : ""}
                `}
              >
                {task.priority || "Low"}
              </span>
              <span className="text-sm text-gray-500">
                {task.checked ? "Done" : "In Progress"}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => setTaskToDelete(task)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Delete Task</h3>
            <p className="mb-6">
              Are you sure you want to delete "{taskToDelete.text}"?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => deleteTask(taskToDelete.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {successMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
          {successMsg}
        </div>
      )}
    </>
  );
}