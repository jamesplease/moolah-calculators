import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UndoProvider } from "./hooks/use-config-form";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UndoProvider>
        <App />
      </UndoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
