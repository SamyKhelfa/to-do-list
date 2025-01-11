import {useEffect, useState } from "react";
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
  useEffect (() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "{}");   
    const user = localStorage.getItem("user")
    

  }, [tasks])

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
    localStorage.removeItem("task")
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
                {localStorage.getItem("task")}
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
