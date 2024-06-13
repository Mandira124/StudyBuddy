// Router.tsx
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/VerificationPage";
import ProtectedRoutes from "./ProtectedRoutes"; // Import ProtectedRoutes component

// Import individual protected route components
import Profile from "./pages/Profile";
import CommunityPosts from "./pages/CommunityPost";
import PostForm from "./pages/PostForm";
import ChatForm from "./pages/ChatForm";
import ChatLobby from "./pages/chatlobby";

// Create your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home2 /> },
      { path: "/home3", element: <Home3 /> },
      { path: "/home4", element: <Home4 /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/verify", element: <VerificationPage /> },
      {
        // Use ProtectedRoutes component as an element
        element: <ProtectedRoutes />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/CommunityPost", element: <CommunityPosts /> },
          { path: "/PostForm", element: <PostForm /> },
          {
            path: "/room",
            element: <ChatLobby />,
          },
          {
            path: "/room/:id",
            element: <ChatForm />,
          },
        ],
      },
    ],
  },
]);

// Define the Router component
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
