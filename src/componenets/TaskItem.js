import React, {useState} from "react";
import { FaTrash } from "react-icons/fa";

function TaskItem({ task, index, completed, onToggle, onDelete, onEdit})

 {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task);

  return (
    <li className={`task ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(index)}
      />
{isEditing ? (
  <input
    type="text"
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
onBlur={() => {
  const trimmed = editText.trim();
  if (trimmed === "") {
    setEditText(task); // Revert to original if blank
  } else {
    onEdit(index, trimmed); // Save trimmed text
  }
  setIsEditing(false); // Exit editing mode
}}
    onKeyDown={(e) => {
  if (e.key === "Enter") {
    const trimmed = editText.trim();
    if (trimmed !== "") {
      onEdit(index, trimmed); // Only save if not empty
    } else {
      setEditText(task); // Revert if empty
    }
    setIsEditing(false);
  } else if (e.key === "Escape") {
    setEditText(task); // Cancel edit
    setIsEditing(false);
  }
}}


    autoFocus
  />
) : (
  <span onDoubleClick={() => setIsEditing(true)}>{task}</span>
)}
      <FaTrash onClick={() => onDelete(index)} style={{ cursor: "pointer" }} />
    </li>
  );
}

export default TaskItem;

