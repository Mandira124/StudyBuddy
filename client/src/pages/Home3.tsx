import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/home3.jpg";
import NavBar from "./NavBar";

const Home3 = () => {
  const navigate = useNavigate();

  const goToHome4 = () => {
    navigate("/home4");
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
    <div className="flex items-center justify-between w-11/12 mx-auto p-6 space-x-20 h-full">
      <img
        src={home}
        alt="Home"
        className="w-full md:w-1/2 h-auto rounded-lg"
      />
      <div className="flex flex-col w-full space-y-6 ">
        <p className="text-4xl  font-bold">
          Broaden your Horizons.
        </p>
        <p className="text-2xl text-gray-700 ">
          Connect with diverse peers for fresh insights and perspectives on your
          studies.
        </p>
        <button
          className="bg-emerald-800 w-1/3 text-white py-3 px-4 font-bold rounded-2xl text-xl  transition-transform transform hover:scale-105"
          onClick={goToHome4}
        >
          Know More
        </button>
      </div>
    </div>
    </div>
  );
  
};

export default Home3;
