import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

console.log("Environment variables check:", {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  APPLICATION_ID: process.env.REACT_APP_APPLICATION_ID
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
