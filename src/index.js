// git@github.com:moamenyasser960/react-projects.git/
import "./index.css";
import App from "./tic-tac-toe.js"
import ReactDOM from "react-dom/client";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
