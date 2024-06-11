import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.css";
import "./styles/App.css";
import { SocketProvider } from "./context/SocketProvider.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <App />
  </SocketProvider>
  // <React.StrictMode>
  // <Router></Router>
  // </React.StrictMode>
);
