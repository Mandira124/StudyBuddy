import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import NavBar from "./NavBar/NavBar";
import logo from "./assets/logo.png";
import CommunityPosts from "./components/communityPost";
const Layout = () => {
  // let items = ["Home", "Text", "Videochat", "Profile"];
  // return (
  //   <div className="flex flex-col min-h-screen">
  //     <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
  //     <main className="flex-grow">
  //     <Outlet />
  //     </main>
  //   </div>
  // );
  return <CommunityPosts/>
};

export default Layout;
