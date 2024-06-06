import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/index.css";
import VideoChat from "./pages/lobby/Lobby.tsx";
import { SocketProvider } from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SocketProvider>
  <App />
</SocketProvider>
  // </React.StrictMode>
);
