import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useEffect } from "react";


function TaskTracker({tasks}) {
    // 1. States
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState(tasks);

    const [completed, setCompleted] = useState(() =>
  JSON.parse(localStorage.getItem("completed")) || tasks.map(() => false)
);


  // 2. Toggle completion
    const toggleTask = (index) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
};

  // 3. Delete task
  const deleteTask = (index) => {
  const updatedTasks = taskList.filter((_, i) => i !== index);
  const updatedCompleted = completed.filter((_, i) => i !== index);
  setTaskList(updatedTasks);
  setCompleted(updatedCompleted);
};

  // 4. Add new task
const addTask = () => {
  if (taskInput.trim() !== "") {
    setTaskList([...taskList, taskInput]);
    setCompleted([...completed, false]);
    setTaskInput(""); 
  }
};
  // 5. Load saved tasks from localStorage (only on first render)
useEffect(() => {
  const savedTasks = localStorage.getItem("taskList");
  if (savedTasks) {
    setTaskList(JSON.parse(savedTasks));
  }
  
}, []);

  
  // 6. Save tasks & completion to localStorage
useEffect(() => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}, [taskList]);

useEffect(() => {
  localStorage.setItem("completed", JSON.stringify(completed));
},[completed]);

  // 7. JSX return
    return (
      
      <div className="task-tracker">
      <h2>📝 Task Tracker</h2>
      {taskList.length === 0 ? (
  <p className="empty-message">🎉 No tasks for now!</p>
) : (
  <ul className="task-list">
    {taskList.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        index={index}
        completed={completed[index]}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    ))}
  </ul>
)}

 <input type = "text" placeholder="Enter your task"
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
    />
    <button onClick={addTask}>Add Task</button>
</div>
 );
}
export default TaskTracker;



