import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.css";
import "./styles/App.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <SocketProvider>
      <Router></Router>
    </SocketProvider>
  </AuthProvider>
);
