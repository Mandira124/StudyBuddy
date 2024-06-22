import React from "react";
import home from "../assets/home4.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

const Home4 = () => {
  const navigate = useNavigate();
  const { username } = useAuth();
  const goToLogin = () => {
    navigate("/login");

  };
  const { access_token } = useAuth();
  console.log(access_token);
  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
    <div className="flex flex-row h-5/6">
      <img src={home} className="w-1/2 h-auto ml-28" alt="Home" />
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-col space-y-5 p-20 justify-center mb-10">
          <p className="text-4xl font-bold">Transform your study routine.</p>
          <p className="text-2xl">
            Connect globally, discuss topics, and achieve academic success.
            </p>
            <button
          className="text-xl w-1/3 bg-emerald-800 text-white p-3 font-bold rounded-xl text-4xl mt-16 hover:text-white hover:bg-emerald-800 transition-transform transform hover:scale-110 rounded-full text-base"
          onClick={goToLogin}
        >
          Dive In
        </button>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home4;
