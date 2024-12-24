import { useState } from "react";

type AddTasksProps = {
  onAddTask: (task: string) => void;
};

const AddTasks = ({ onAddTask }: AddTasksProps) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTasks;
