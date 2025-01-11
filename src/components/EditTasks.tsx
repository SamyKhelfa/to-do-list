import { useState } from "react";

type EditTasksProps = {
  taskValue: string;
  onSave: (newTask: string) => void;
  onCancel: () => void;
};

const EditTasks = ({ taskValue, onSave, onCancel }: EditTasksProps) => {
  const [newTask, setNewTask] = useState(taskValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditTasks;
