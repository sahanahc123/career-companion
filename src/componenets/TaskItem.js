import React from "react";

function TaskItem({ task, index, completed, onToggle, onDelete }) {
  return (
    <li className={`task ${completed ? "completed" : ""}`} key={index}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(index)}
      />
      {task}
<button onClick={() => onDelete(index)} className="delete-button">🗑️</button>
    </li>
  );
}

export default TaskItem;

