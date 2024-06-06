import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./components/auth/RegisterPage";
import Profile from "./components/profile"
import LoginPage from "./components/auth/LoginPage";
import logo from "./assets/logo.png"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LobbyScreen from "./pages/lobby/Lobby";
import RoomPage from "./pages/room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LobbyScreen />,},
    {
      path: "/room/:roomId",
        element: <RoomPage />,
    }
]);

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
    <RouterProvider router={router} />
  );
};

export default App;
