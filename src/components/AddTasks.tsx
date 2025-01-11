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
    localStorage.setItem("tasks", JSON.stringify({
      user : [
        task
      ]
    }))
    
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

// const tasks = {
//   "jean@gmail.com" : [
//     "task1",
//     "task2"
//   ],
//   "john@gmail.com": [
//     "task1",
//     "task2"
//   ]
// }

// const user = localStorage.getItem("user")

// tasks[user]
