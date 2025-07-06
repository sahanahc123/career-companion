import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";

function TaskTracker({tasks}) {
    const [completed, setCompleted] = useState(
  tasks.map(() => false)
);
    const toggleTask = (index) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
  };


    return (
      <div className="task-tracker">
      <h2>📝 Task Tracker</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
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
    ))};
    </ul>
            
 </div>
    );
}
export default TaskTracker;



