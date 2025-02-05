import { useEffect, useState } from "react";

type AddTasksProps = {
  onAddTask: (task: string) => void;
};

const AddTasks = ({ onAddTask }: AddTasksProps) => {
  const [task, setTask] = useState("");
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim() || !user) return;

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "{}");

    const allTasks = typeof storedTasks === "object" && !Array.isArray(storedTasks) ? storedTasks : {};

    const updatedTasks = {
      ...allTasks,
      [user]: [...(allTasks[user] || []), task]
    };

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

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