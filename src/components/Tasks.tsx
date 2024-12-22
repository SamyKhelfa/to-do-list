import { useState } from "react";
import AddTasks from "./AddTasks";
import EditTasks from "./EditTasks";

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleAddTask = (newTask: string) => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          isCompleted: false,
        },
      ]);
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task;
      })
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, text: newText } : task;
      })
    );
    setEditingTaskId(null);
  };

  return (
    <>
      <AddTasks onAddTask={handleAddTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <EditTasks
                taskValue={task.text}
                onSave={(newTask) => handleEditTask(task.id, newTask)}
                onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task.id)}
                />
                {task.text}
                <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
