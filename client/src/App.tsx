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
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";
import Home3 from "./components/Home3";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home4 from "./components/Home4";

function App() {
  return (
  <div>
  <NavBar brandName="StudyBuddy" imageSrcPath={logo}
    navItems={items} />
    </div>
  );
}

export default App;
