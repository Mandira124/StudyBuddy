import NavBar from "./NavBar/NavBar";
import RegisterPage from "./components/auth/RegisterPage";
import Profile from "./components/profile";
import LoginPage from "./components/auth/LoginPage";
import logo from "./assets/logo.png";
import { BrowserRouter as Router,useNavigate,Route,Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home1 from "./components/Home1";


const App = () => {
  
  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    <Router>
      <div>
        <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
        <Routes>
          <Route path="/" element={<Home1/>} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
