import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/home2.png";
import NavBar from "./NavBar";

const Home2 = () => {
  const navigate = useNavigate();

  const goToHome3 = () => {
    navigate("/home3");
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
    <div className="flex items-center justify-between w-full h-5/6 mx-auto p-6 rounded-lg space-x-28">
      <img
        src={home}
        alt="Home"
        className="w-2/5 ml-24 h-auto rounded-lg"
      />
      <div className="flex flex-col w-1/2 h-auto">
        <p className="text-4xl font-bold w-3/4 ">
          Discover the joy of peer-to-peer learning
        </p>
        <p className="text-2xl w-full mt-6 text-gray-700 w-3/4">
          Reignite your passion, and explore new concepts.
        </p>
        <button
          className="bg-emerald-800 w-1/3 mt-12 text-white py-3 px-6 font-bold rounded-2xl text-xl  transition-transform transform hover:scale-105"
          onClick={goToHome3}
        >
          NEXT
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home2;
