import React from "react";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home1 from "./pages/Home1";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import Sidebar from "./pages/SideBar";
import LobbyScreen from "./pages/lobby/Lobby";
import RoomPage from "./pages/room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
      {
        path: "/home2",
        element: <Home2 />,
      },
      {
        path: "/home3",
        element: <Home3 />,
      },
      {
        path: "/home4",
        element: <Home4 />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <VerificationPage />,
      },
      {
        path: "/lobby",
        element: <LobbyScreen />,
      },
      {
        path: "/room/:roomId",
        element: <RoomPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
