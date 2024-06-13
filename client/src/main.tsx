import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.css";
import "./styles/App.css";
// import { SocketProvider } from "./context/SocketProvider.tsx";
import App from "./App.tsx";
import {UserProvider} from "./context/contextapi.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
<<<<<<< HEAD
  // <SocketProvider>
  //   <App />
  // </SocketProvider>
  <React.StrictMode>
  <Router></Router>
  </React.StrictMode>
=======
  <UserProvider>
    <Router></Router>
  </UserProvider>
>>>>>>> 120267d3209ada3184512d2fc96bf06ce066210d
);
