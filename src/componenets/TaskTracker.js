import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";

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

  const addTask = () => {
  if (taskInput.trim() !== "") {
    setTaskList([...taskList, taskInput]);
    setCompleted([...completed, false]);
    setTaskInput(""); 
  }
};



  const [taskList, setTaskList] = useState(tasks);


    return (
      
      <div className="task-tracker">
      <h2>📝 Task Tracker</h2>
      <ul className="task-list">
        {taskList.map((task, index) => (
          <li
            className={`task ${completed[index] ? "completed" : ""}`}
            key={index}
          >
    <input
      type="checkbox"
      checked={completed[index]}
      onChange={() => toggleTask(index)}
    />
        {task}
      </li>
    ))}
    </ul>

    <input type = "text" placeholder="Enter your task"
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
    />
<button onClick={addTask}>Add Task</button>
            
 </div>
    );


}
export default TaskTracker;



