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
  const user = localStorage.getItem("user")

  useEffect(() => {
    if (user) {
      try {
        const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user}`) || "[]");
        console.log("Loading tasks:", storedTasks); 
        console.log("User:", user); 
        setTasks(storedTasks);
      } catch (error) { 
        console.error("Erreur lors du chargement des tâches:", error);
        setTasks([]);
      }
    }
  }, [user])
  
  useEffect(() => {
    if (user) {
      try {
        console.log("Saving tasks:", tasks); 
        localStorage.setItem(`tasks_${user}`, JSON.stringify(tasks));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des tâches:", error);
      }
    }
  }, [tasks, user])

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

