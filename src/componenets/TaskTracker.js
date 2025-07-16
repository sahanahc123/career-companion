import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useEffect } from "react";


function TaskTracker({tasks}) {
    // 1. States
    const [taskInput, setTaskInput] = useState("");
const [taskList, setTaskList] = useState(() => {
  const savedTasks = localStorage.getItem("taskList");
  return savedTasks ? JSON.parse(savedTasks) : tasks;
});
    const [filter, setFilter] = useState("all");
    const [completed, setCompleted] = useState(() =>
  JSON.parse(localStorage.getItem("completed")) || tasks.map(() => false)
);
const completedCount = completed.filter(val => val).length;
  
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
 const editTask = (index, newText) => {
  const updatedTasks = [...taskList];
  updatedTasks[index] = newText;
  setTaskList(updatedTasks);
};

  // 4. Add new task
const addTask = () => {
  const trimmed = taskInput.trim();
  if (trimmed === ""){
      alert("Please enter a task!");
      return;
  }
    

  if (taskList.includes(trimmed)) {
    alert("Task already exists!");
    return;
  }

  setTaskList([...taskList, trimmed]);
  setCompleted([...completed, false]);
  setTaskInput(""); 
};


const clearAllTasks = () => {
  setTaskList([]);
  setCompleted([]);
  localStorage.removeItem("taskList");
  localStorage.removeItem("completed");
};
  
  // 6. Save tasks & completion to localStorage
useEffect(() => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}, [taskList]);

useEffect(() => {
  localStorage.setItem("completed", JSON.stringify(completed));
},[completed]);

const filteredTasks = taskList.filter((_, index) => {
  if (filter === "all") return true;
  if (filter === "completed") return completed[index];
  if (filter === "incomplete") return !completed[index];
  return true;
});



  // 7. JSX return
    return (
      
      <div className="task-tracker">
      <h2>📝 Task Tracker</h2>
     {completedCount > 0 && (
  <p className="completed-counter">
    ✅ You’ve completed {completedCount} task{completedCount > 1 ? "s" : ""}!
  </p>
   )}  {taskList.length === 0 ? (
  <p className="empty-message">🎉 No tasks for now!</p>) : (
  <ul className="task-list">
    <div className="filter-buttons">
  <button
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>
  <button
    className={filter === "completed" ? "active" : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>
  <button
    className={filter === "incomplete" ? "active" : ""}
    onClick={() => setFilter("incomplete")}
  >
    Incomplete
  </button>
</div>

    {filteredTasks.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        index={index}
        completed={completed[index]}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}

      />
    ))}
  </ul>
)}

 <input type = "text" placeholder="Enter your task"
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
    />
<button onClick={addTask}>Add Task</button>
{taskList.length > 0 && (
  <button className="clear-btn" onClick={clearAllTasks}>
    Clear All Tasks
  </button>
)}

</div>

 );
}
export default TaskTracker;



