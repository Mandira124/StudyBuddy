import React from "react";
import home from "../assets/home4.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home4 = () => {
  const navigate = useNavigate();
  const {username}=useAuth();
  const goToLogin = () => {
    navigate("/login");
    
  };
  const {access_token}=useAuth();
  console.log(access_token);
  return (
    <div className="flex flex-row ml-40">
      <img src={home} className="w-1/2 h-screen" alt="Home" />
      <div className="flex flex-col justify-center">
        <div className="flex flex-col space-y-5 p-8 justify-center mb-10">
          <p className="text-4xl font-bold">Transform your study routine.</p>
          <p className="text-2xl">
            Connect globally, discuss topics, and achieve academic success.
          </p>
        </div>
        <button
          className="text-xl w-1/3 bg-emerald-800 text-white p-4 font-bold rounded-xl text-4xl ml-10 hover:text-white hover:bg-emerald-800 transition-transform transform hover:scale-110 rounded-full text-base"
          onClick={goToLogin}
        >
          Dive In {username}
        </button>
      </div>
    </div>
  );
};

export default Home4;
