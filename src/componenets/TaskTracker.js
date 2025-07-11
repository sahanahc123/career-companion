import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useEffect } from "react";


function TaskTracker({tasks}) {
    const [completed, setCompleted] = useState(
  tasks.map(() => false)
);
  const [taskInput, setTaskInput] = useState("");


    const toggleTask = (index) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
};
  const deleteTask = (index) => {
  const updatedTasks = taskList.filter((_, i) => i !== index);
  const updatedCompleted = completed.filter((_, i) => i !== index);
  setTaskList(updatedTasks);
  setCompleted(updatedCompleted);
};

  const addTask = () => {
  if (taskInput.trim() !== "") {
    setTaskList([...taskList, taskInput]);
    setCompleted([...completed, false]);
    setTaskInput(""); 
  }
};

const [taskList, setTaskList] = useState(tasks);
useEffect(() => {
  const savedTasks = localStorage.getItem("taskList");
  if (savedTasks) {
    setTaskList(JSON.parse(savedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}, [taskList]);




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



