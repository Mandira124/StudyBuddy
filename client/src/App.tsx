
import NavBar from "./pages/NavBar";
import RegisterPage from "./pages/auth/RegisterPage";
import Profile from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import logo from "./assets/logo.png"

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
    <div>
      <NavBar brandName="StudyBuddy" imageSrcPath={logo}
    navItems={items} />
    </div>
  )
}

export default App;
