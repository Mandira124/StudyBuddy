import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavBar from "./NavBar/NavBar";
import logo from "./assets/logo.png";

const Layout = () => {
  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
      <main className="flex-grow">
      <Outlet />
      
      </main>
    </div>
  );
};

export default Layout;
