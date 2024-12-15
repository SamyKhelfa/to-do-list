import { useState } from "react";

type AddTasksProps = {
  onAddTask: (task: string) => void;
};

const AddTasks = ({ onAddTask }: AddTasksProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(task);
    setTasks("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="task"
        value={task}
        onChange={(e) => setTasks(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTasks;
