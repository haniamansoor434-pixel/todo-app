import React from "react";
import TaskList from "./TaskList";

export default function ImportantTask({ tasks, setTasks, loading, setLoading }) {

  const importantTasks = tasks.filter((task) => task.priority === "High");

  return (
    <TaskList
      tasks={importantTasks}
      setTasks={setTasks}
      loading={loading}
      setLoading={setLoading}
    />
  );
}