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

export default function Todo() {
  const [active, setActive] = useState("All Tasks");
  const [openPopup, setOpenPopup] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
    <div className="flex bg-gray-200 h-screen ">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-white">
        <Sidebar active={active} setActive={setActive} />
      </div>

      <div className="ml-64 flex flex-col w-full">
        {/* Navbar */}
        <div className="sticky top-0  bg-white">
          <Navbar
            setOpenPopup={setOpenPopup}
            search={search}
            setSearch={setSearch}
            successMsg={successMsg}
            setSuccessMsg={setSuccessMsg}
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

        <div className="flex-1 overflow-y-auto p-6">
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
  );
}
