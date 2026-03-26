import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import db from "../../firebase";

export default function NewTask({
  openPopup,
  setOpenPopup,
  task,
  setTask,
  loading,
  setLoading,
  successMsg,
  setSuccessMsg
}) {
  const [priority, setPriority] = useState('');

  const addTask = async () => {
    if (!task) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "tasks"), {
        text: task,
        checked: false,
        priority: priority,
        status: "In Progress",
        createdAt: serverTimestamp(),
      });

      setTask("");
      setPriority("");
      setOpenPopup(false);

      // show success message
      setSuccessMsg("Task added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000); // hide after 3 seconds
    } catch (err) {
      console.error(err);
      setSuccessMsg("Failed to add task.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Popup */}
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-auto border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add New Task
            </h2>

            {/* Input */}
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border border-gray-300 focus:border-cyan-500 outline-none p-3 rounded-lg mb-6 transition"
            />

            {/* Priority */}
            <p className="text-sm font-semibold text-gray-600 mb-3">Priority</p>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setPriority("High")}
                className={`px-4 py-2 rounded-lg transition-transform duration-200 ${
                  priority === "High"
                    ? "scale-105 bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg"
                    : "scale-100 hover:scale-100 bg-gradient-to-r from-red-400 to-pink-300 text-black opacity-70"
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setPriority("Medium")}
                className={`px-4 py-2 rounded-lg text-black transition-transform duration-200 ${
                  priority === "Medium"
                    ? "scale-105 bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                    : "scale-100 bg-gradient-to-r from-red-500 to-orange-400 hover:scale-100 opacity-70"
                }`}
              >
                Medium Priority
              </button>
              <button
                onClick={() => setPriority("Low")}
                className={`px-4 py-2 rounded-lg text-black bg-gradient-to-r from-cyan-400 to-blue-300 transition-transform duration-200 ${
                  priority === "Low"
                    ? "scale-105 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-500 text-white"
                    : "scale-100 hover:scale-100 opacity-70"
                }`}
              >
                Low Priority
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:scale-105 hover:shadow-lg transition"
                onClick={addTask}
              >
                {loading ? <ClipLoader color="#fff" size={15} /> : " Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
          {successMsg}
        </div>
      )}
    </>
  );
}