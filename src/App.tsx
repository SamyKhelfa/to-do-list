import { useState } from "react";
import "./App.css";
import AddTasks from "./components/AddTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <AddTasks onAddTask={handleAddTask} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
