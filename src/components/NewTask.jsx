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
  setSuccessMsg,
 
}) {
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  
 

  const addTask = async () => {
    if (!task) {
      setError("Please add a task");
      return;
    }

    setError("");
    console.log("Task added:", task);
    setTask("");

    setLoading(true);

    try {
      await addDoc(collection(db, "tasks"), {
        text: task,
        checked: false,
        priority: priority|| "Low",
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
      {/* Popup Modal */}
      {openPopup && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:w-full sm:max-w-md border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              Add New Task
            </h2>
            {/* Error Message */}

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            {/* Input */}
            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border border-gray-300 focus:border-cyan-500 outline-none p-2.5 sm:p-3 rounded-lg mb-4 sm:mb-6 transition text-sm sm:text-base"
            />

            {/* Priority */}
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
              Priority
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <button
                onClick={() => setPriority("High")}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-transform duration-200 text-xs sm:text-sm whitespace-nowrap ${
                  priority === "High"
                    ? "scale-105 bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg"
                    : "scale-100 bg-gradient-to-r from-red-400 to-pink-300 text-black opacity-70"
                }`}
              >
                High
              </button>
              <button
                onClick={() => setPriority("Medium")}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-black transition-transform duration-200 text-xs sm:text-sm whitespace-nowrap ${
                  priority === "Medium"
                    ? "scale-105 bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                    : "scale-100 bg-gradient-to-r from-red-500 to-orange-400 opacity-70"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setPriority("Low")}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-black bg-gradient-to-r from-cyan-400 to-blue-300 transition-transform duration-200 text-xs sm:text-sm whitespace-nowrap ${
                  priority === "Low"
                    ? "scale-105 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-500 text-white"
                    : "scale-100 opacity-70"
                }`}
              >
                Low
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-sm sm:text-base font-medium"
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </button>

              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:scale-105 hover:shadow-lg transition text-sm sm:text-base font-medium"
                onClick={addTask}
              >
                {loading ? <ClipLoader color="#fff" size={15} /> : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="fixed top-4 sm:top-6 md:top-10 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg z-50 animate-fadeInOut text-sm sm:text-base max-w-sm">
          {successMsg}
        </div>
      )}
    </>
  );
}
    //  {/* Priority */}
    //         <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
    //           Priority
    //         </p>

    //         <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
    //           {["High", "Medium", "Low"].map((level) => (
    //             <button
    //               key={level}
    //               onClick={() => setPriority(level)}
    //               className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-transform duration-200 ${
    //                 priority === level
    //                   ? "scale-105 bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg"
    //                   : "scale-100 bg-gray-200 text-black opacity-70"
    //               }`}
    //             >
    //               {level}
    //             </button>
    //           ))}
    //         </div>