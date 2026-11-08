import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Keep the preview mounted from the current application entrypoint after structural updates.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
