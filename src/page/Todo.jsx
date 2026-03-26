// src/pages/Todo.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import ImportantTask from "../components/ImportantTask";
import CompletedTask from "../components/CompletedTask";
import TodayTasks from "../components/TodayTasks";
import Sidebar from "../components/Sidebar";
import NewTask from "../components/NewTask";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
import { ClipLoader } from "react-spinners";
import { X } from "lucide-react";

export default function Todo() {
  const [active, setActive] = useState("All Tasks");
  const [openPopup, setOpenPopup] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const filteredTasks = tasks.filter((task) => {
    return task.text?.toLowerCase().includes(search.toLowerCase());
  });

  const renderContent = () => {
    if (filteredTasks.length === 0) {
      return (
        <div className="text-center text-gray-500 py-10">
          {search ? `No tasks found for "${search}"` : "No tasks available."}
        </div>
      );
    }
    switch (active) {
      case "All Tasks":
        return (
          <TaskList
            tasks={filteredTasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
            
          />
        );

      case "Important Tasks":
        return (
          <ImportantTask
            tasks={filteredTasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
          />
        );

      case "Completed Tasks":
        return (
          <CompletedTask
            tasks={filteredTasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
          />
        );

      case "Today Tasks":
        return (
          <TodayTasks
            tasks={filteredTasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    setFetching(true);
    const unSubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
      setFetching(false);
    });

    return () => unSubscribe();
  }, []);

  return (
    <div className="flex bg-gray-200 h-screen overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop visible, Mobile slidable */}
      <div className={`fixed md:static top-0 left-0 h-full w-56 sm:w-64 md:w-64 bg-white z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="relative h-full flex flex-col">
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
          >
            <X size={24} />
          </button>
          <Sidebar active={active} setActive={setActive} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full overflow-hidden">
        {/* Navbar */}
        <div className="sticky top-0 bg-white z-20 shadow-sm">
          <Navbar
            setOpenPopup={setOpenPopup}
            search={search}
            setSearch={setSearch}
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        <NewTask
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          task={task}
          setTask={setTask}
          tasks={tasks}
          setTasks={setTasks}
          loading={loading}
          setLoading={setLoading}
          successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}
        
        />

        <div className="flex-1 overflow-y-auto">
          <div className="p-2 sm:p-4 md:p-6">
            {fetching ? (
              <div className="flex justify-center py-10">
                <ClipLoader color="blue" size={30} />
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
