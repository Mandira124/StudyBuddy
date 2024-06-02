import React from "react";
import home from "../assets/home2.png";

const Home2 = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto p-6 bg-white rounded-lg shadow-2xl space-y-6 md:space-y-0 md:space-x-10">
      <img src={home} alt="Home" className="w-full md:w-1/2 h-auto rounded-lg" />
      <div className="flex flex-col w-full md:w-1/2 space-y-6 text-center md:text-left items-center md:items-start">
        <p className="text-2xl md:text-2xl lg:text-6xl font-bold w-3/4 md:w-full">
          Discover the joy of peer-to-peer learning
        </p>
        <p className="text-xl md:text-3xl w-full md:w-3/4 text-gray-700">
          Reignite your passion, and explore new concepts.
        </p>
        <button className="bg-emerald-900 text-white py-3 px-6 md:py-4 md:px-8 font-bold rounded-2xl text-xl md:text-3xl transition-transform transform hover:scale-105">
          NEURONS FIRE
        </button>
      </div>
    </div>
  );
};

export default Home2;
