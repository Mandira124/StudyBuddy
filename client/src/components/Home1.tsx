import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/home1.png";

const Home1 = () => {
  const navigate = useNavigate();

  const goToHome2 = () => {
    navigate("/home2");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg space-y-6 md:space-y-0 md:space-x-10 min-h-screen">
      <div className="flex flex-col items-center md:items-start w-full md:w-1/2 space-y-6 text-center md:text-left">
        <button
          className="bg-emerald-900 text-white py-3 px-6 md:py-4 md:px-8 rounded-full text-xl md:text-3xl transition-transform transform hover:scale-105"
          onClick={goToHome2}
        >
          Find a Bunny Now
        </button>
        <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Brains Connected to Wifi!
        </p>
      </div>
      <img
        src={home}
        alt="Home"
        className="w-full md:w-1/2 h-auto rounded-lg"
      />
    </div>
  );
};

export default Home1;
