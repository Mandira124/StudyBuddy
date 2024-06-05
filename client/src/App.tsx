
import NavBar from "./pages/NavBar";
import RegisterPage from "./pages/auth/RegisterPage";
import Profile from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import logo from "./assets/logo.png"
import { Outlet } from "react-router-dom";

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

export default App;
