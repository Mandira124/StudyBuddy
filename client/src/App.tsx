import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import RegisterPage from "./components/auth/RegisterPage";
import Profile from "./components/profile"
import LoginPage from "./components/auth/LoginPage";
import logo from "./assets/logo.png"
import CommunityPosts from "./components/communityPost";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
  <Profile />
  );
};

export default App;
