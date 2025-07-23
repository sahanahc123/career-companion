import React from "react"; // Bring React so we can use JSX
import './TaskTracker.css';
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useEffect } from "react";


function TaskTracker() {
    // 1. States
    const [taskInput, setTaskInput] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium"); 
    const [taskList, setTaskList] = useState(() => {
     const savedTasks = localStorage.getItem("taskList");
  return savedTasks
    ? JSON.parse(savedTasks)
    : [
        { text: "Learn React", dueDate: "2025-07-21", completed: false },
        { text: "Practice LeetCode", dueDate: "2025-07-22", completed: false },
      ];
});

const [filter, setFilter] = useState("all");
    
const completedCount = taskList.filter(task => task.completed).length;
  
  // 2. Toggle completion
    const toggleTask = (index) => {
    const updatedTasks = [...taskList];
updatedTasks[index].completed = !updatedTasks[index].completed;
setTaskList(updatedTasks);

};

  const deleteTask = (index) => {
  const updatedTasks = [...taskList];
  updatedTasks.splice(index, 1); // remove the item
  setTaskList(updatedTasks);
};
   
 const editTask = (index, newText) => {
  const updatedTasks = [...taskList];
  updatedTasks[index].text = newText;
  setTaskList(updatedTasks);
};

  // 4. Add new task
  const addTask = () => {
  const trimmed = taskInput.trim(); 
  if (trimmed === "") {
    alert("Please enter a task!");
    return;
  }

  const isDuplicate = taskList.some(
    (task) => task.text.trim().toLowerCase() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    alert("Task already exists!");
    return;
  }
   
 //  Create a task object with text and dueDate
  const newTask = {
  text: trimmed,
  dueDate: dueDate,
  priority: priority,
  completed: false,
};

setTaskList([...taskList, newTask]);  
setTaskInput("");
setDueDate("");
setPriority("Medium");
};

const clearAllTasks = () => {
  setTaskList([]); // This will trigger useEffect to update localStorage
};



  
  // 6. Save tasks & completion to localStorage
useEffect(() => {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}, [taskList]);



const filteredTasks = taskList.filter((task) => {
  if (filter === "all") return true;
  if (filter === "completed") return task.completed;
  if (filter === "incomplete") return !task.completed;
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
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        taskList = {taskList}
        setTaskList = {setTaskList}

      />
    ))}
  </ul>
)}

 <div className="input-group">
  <input
    type="text"
    placeholder="Add a new task"
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
  />
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />
<select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="priority-dropdown"
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>

  </select>
  </div>

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



