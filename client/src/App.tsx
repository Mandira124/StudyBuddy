import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/NavBar";
import logo from "./assets/logo.png";

const Layout = () => {
  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
