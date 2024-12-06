import React from "react";
import ReactDOM from "react-dom/client";


//import "./index.css";

function App() {
  return(
  <div className="container">
    <div>Name: users</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);}
export default App
 
 const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement) 

root.render(<App />) 
 