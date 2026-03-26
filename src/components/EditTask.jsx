import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase";

export default function EditTask({ task, successMsg, setSuccessMsg }) {
  const [editTask, setEditTask] = useState(null);
  const [newText, setNewText] = useState("");
  const [priority, setPriority] = useState("");

  const openEditModal = (task) => {
    setEditTask(task);
    setNewText(task.text);
    setPriority(task.priority || "Low"); 
  };

  const updateTask = async (id) => {
    const currentPriority = task.priority || "Low";

    //  If nothing changed → just close modal (no message)
    if (
      newText.trim() === task.text.trim() &&
      priority === currentPriority
    ) {
      setEditTask(null);
      return;
    }

    // Prevent empty task
    if (!newText) return;

    try {
      await updateDoc(doc(db, "tasks", id), {
        text: newText,
        priority: priority,
      });

      setSuccessMsg("Task updated successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setEditTask(null);
    }
  };

  return (
    <>
      <button
        onClick={() => openEditModal(task)}
        className="text-blue-500 hover:text-blue-700 transition-colors p-1"
        aria-label="Edit task"
      >
        <SquarePen size={18} />
      </button>

      {/* Modal */}
      {editTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

            <h3 className="text-xl font-bold mb-4">Edit Task</h3>

            {/* Input */}
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Edit task..."
            />

            {/* Priority Buttons */}
            <div className="flex gap-2 mb-5">
              {["High", "Medium", "Low"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition
                    ${
                      priority === p
                        ? "bg-gradient-to-r from-cyan-500 to-blue-400 text-white shadow"
                        : "bg-gray-300 hover:bg-gray-300"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditTask(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => updateTask(editTask.id)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>

       
          {successMsg && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
              {successMsg}
            </div>
          )}
        </div>
      )}
    </>
  );
}