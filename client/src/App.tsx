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
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home1 />} />
          <Route path= "home2" element={<Home2 />} />
          <Route path="home3" element={<Home3 />} />
          <Route path="home4" element={<Home4/>}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
