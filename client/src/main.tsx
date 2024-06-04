import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage.tsx";
import Home1 from "./components/Home1.tsx";
import Home2 from "./components/Home2.tsx";
import Home3 from "./components/Home3.tsx";
import Home4 from "./components/Home4.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="h1" element={<Home1 />} />
      <Route path="home2" element={<Home2 />} />
      <Route path="home3" element={<Home3 />} />
      <Route path="home4" element={<Home4 />} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VerificationPage />
  </React.StrictMode>,
);
