import React from "react";
import TaskTracker from "./componenets/TaskTracker";

function App() {
  const myTasks = ["create resume","Apply to 3 jobs", "LeetCode Practice"];

  return (
    <div className="App">
    <h1>Career Companion</h1>
    <TaskTracker tasks ={myTasks}/>
    </div>
  );
}
export default App;