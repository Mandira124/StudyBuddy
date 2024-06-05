import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/NavBar";
import logo from "./assets/logo.png";
import Profile from "./pages/profile";
import CommunityPosts from "./pages/CommunityPost";

const Layout = () => {
  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    // <div className="flex flex-col min-h-screen">
    //   <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //   <main className="flex-grow">
    //   <Outlet />
      
    //   </main>
    // </div>
    <CommunityPosts/>
  );
};

export default Layout;
