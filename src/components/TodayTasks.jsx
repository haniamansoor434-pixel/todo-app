import React from "react";
import TaskList from "./TaskList";

export default function TodayTasks({ tasks, setTasks, loading, setLoading }) {
  const today = new Date();

  const todayTasks = tasks.filter((task) => {
    if (!task.createdAt) return false;

    // Convert Firestore timestamp to JS Date if needed
    const taskDate = task.createdAt.toDate ? task.createdAt.toDate() : new Date(task.createdAt);

    // Compare only year, month, day
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <TaskList
      tasks={todayTasks}
      setTasks={setTasks}
      loading={loading}
      setLoading={setLoading}
    />
  );
}