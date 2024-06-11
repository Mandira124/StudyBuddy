import NavBar from "./pages/NavBar";
import RegisterPage from "./pages/auth/RegisterPage";
import Profile from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import logo from "./assets/logo.png";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Outlet } from "react-router-dom";

import CommunityPosts from "./pages/CommunityPost";
import Chat from "./pages/chat";

import PostForm from "./pages/PostForm";
import VerificationPage from "./pages/VerificationPage";
import LobbyScreen from "./pages/lobby/Lobby";
import RoomPage from "./pages/room/Room";

const router = createBrowserRouter([
  {
    path: "/lobby",
    element: <LobbyScreen />,
  },
  {
    path: "/room/:roomId",
    element: <RoomPage />,
  },
]);

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    // <<<<<<< main
    //     <div className="flex flex-col min-h-screen">
    //       <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //       <main className="flex-grow">
    //         <Outlet />
    //       </main>
    //     </div>
    //   )
    //  <Chat/>
    // }
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>

    // <div className="flex flex-col min-h-screen">
    //   <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //   <main className="flex-grow">
    // <Outlet />

    //   </main>
    // </div>

    // <NavBar/>
  );
};

export default App;

