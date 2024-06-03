import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/home2.png";

const Home2 = () => {
  const navigate = useNavigate();

  const goToHome3 = () => {
    navigate("/home3");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 md:space-y-0 md:space-x-10 min-h-screen">
      <img src={home} alt="Home" className="w-full md:w-1/2 h-auto rounded-lg" />
      <div className="flex flex-col w-full md:w-1/2 space-y-6 text-center md:text-left items-center md:items-start">
        <p className="text-3xl md:text-5xl lg:text-6xl font-bold w-3/4 md:w-full">
          Discover the joy of peer-to-peer learning
        </p>
        <p className="text-xl md:text-3xl w-full md:w-3/4 text-gray-700">
          Reignite your passion, and explore new concepts.
        </p>
        <button className="bg-emerald-900 text-white py-3 px-6 md:py-4 md:px-8 font-bold rounded-2xl text-xl md:text-3xl transition-transform transform hover:scale-105" onClick={goToHome3}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Home2;
