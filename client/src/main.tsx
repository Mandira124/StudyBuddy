import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.css";
import "./styles/App.css";
// import { SocketProvider } from "./context/SocketProvider.tsx";
import App from "./App.tsx";
import {UserProvider} from "./context/contextapi.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <Router></Router>
  </UserProvider>
);
