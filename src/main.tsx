import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundry from "./components/errorboundry/index";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </React.StrictMode>
);
