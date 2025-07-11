import React from "react";
import { FaTrash } from "react-icons/fa";

function TaskItem({ task, index, completed, onToggle, onDelete }) {
  return (
    <li className={`task ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(index)}
      />
      <span>{task}</span>
      <FaTrash onClick={() => onDelete(index)} style={{ cursor: "pointer" }} />
    </li>
  );
}

export default TaskItem;
