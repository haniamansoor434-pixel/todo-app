import React, { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../../firebase';
import NewTask from './NewTask';

export default function EditTask({ task, successMsg,setSuccessMsg }) {
  const [editTask, setEditTask] = useState(null);
  const [newText, setNewText] = useState("");
   const [error, setError] = useState("");
  
  

  const openEditModal = (task) => {
    setEditTask(task);
    setNewText(task.text); 
  };

  const updateTask = async (id) => {
    if (newText === task.text){
      setError("Write something first..")
      return;
    }
    setError("");
    
   
    try {
      await updateDoc(doc(db, "tasks", id), { text: newText });
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
        className="text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0 p-1"
        aria-label="Edit task"
      >
        <SquarePen size={18} />
      </button>

      {editTask && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 w-full sm:max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Edit Task</h3>
            
            
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 text-sm sm:text-base"
              placeholder="Edit task text"
            />

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base font-medium transition-colors"
                onClick={() => setEditTask(null)}
              >
                Cancel
              </button>

              <button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm sm:text-base font-medium transition-colors"
                onClick={() => updateTask(editTask.id)}
              >
                Save
              </button>
            </div>
          </div>
            {successMsg && (
        <div className="fixed top-4 sm:top-6 md:top-10 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg z-50 animate-fadeInOut text-sm sm:text-base max-w-sm">
          {successMsg}
        </div>
      )}
        </div>
      )}
    </>
  );
}