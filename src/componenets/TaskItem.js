import React, {useState} from "react";
import { FaTrash } from "react-icons/fa";

function TaskItem({ task, index, completed, onToggle, onDelete, onEdit ,taskList, setTaskList}) {

 
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [editPriority, setEditPriority] = useState(task.priority || "Medium");

const handleBlur = () => {
  const trimmedText = editText.trim();
  if (trimmedText === "") return;

  const updatedTasks = [...taskList];
  updatedTasks[index] = {
    ...updatedTasks[index],
    text: trimmedText,
    dueDate: editDueDate,
    priority: editPriority,
  };

  setTaskList(updatedTasks);
  localStorage.setItem("taskList", JSON.stringify(updatedTasks));
  setIsEditing(false);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleBlur();
  }
};



  return (
    <li className={`task ${task.completed ? "completed" : ""}`}>
<input
  type="checkbox"
  checked={task.completed}
  onChange={() => onToggle(index)}
/>

{isEditing ? (
  <div className="edit-fields">
    <input
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={handleBlur}
  onKeyDown={handleKeyDown}
    />
    <input
      type="date"
      value={editDueDate}
      onChange={(e) => setEditDueDate(e.target.value)}
      onBlur={handleBlur}
  onKeyDown={handleKeyDown}
    />
    <select
      value={editPriority}
      onChange={(e) => setEditPriority(e.target.value)}
        onBlur={handleBlur}

    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

  </div>
) : (
  <span onDoubleClick={() => setIsEditing(true)} className="task-text">
    {task.text}
  </span>
    )}
  <FaTrash onClick={() => onDelete(index)} style={{ cursor: "pointer" }} />
    </li>
  );
}

export default TaskItem;

