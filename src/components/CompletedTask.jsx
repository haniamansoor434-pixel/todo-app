import React from "react";
import TaskList from "./TaskList"; 

export default function CompletedTask({ tasks, setTasks, loading, setLoading, successMsg, setSuccessMsg }) {
  const completedTasks = tasks.filter((task) => task.checked);

  return (
    <TaskList
      tasks={completedTasks}
      setTasks={setTasks}
      loading={loading}
      setLoading={setLoading}
      successMsg={successMsg}
      setSuccessMsg={setSuccessMsg}
      showChecked={true} 
    />
  );
}