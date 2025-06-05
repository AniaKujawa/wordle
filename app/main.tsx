import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import { Welcome } from "./welcome/welcome";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);
