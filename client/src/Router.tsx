import React from "react";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import Sidebar from "./pages/SideBar";
import CommunityPosts from "./pages/CommunityPost";
import PostForm from "./pages/PostForm";
import Profile from "./pages/profile";
import ChatForm from "./pages/ChatForm";
import LobbyScreen from "./pages/lobby/Lobby";
import RoomPage from "./pages/room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
        element: <RegisterPage />,
      },
      {
        path: "/CommunityPost",
        element: <CommunityPosts />,
      },
      {
        path: "/PostForm",
        element: <PostForm />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/chat",
        element: <ChatForm />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
