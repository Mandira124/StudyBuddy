import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/home3.jpg";

const Home3 = () => {
  const navigate = useNavigate();

  const goToHome4 = () => {
    navigate("/home4");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto p-6 space-y-6 md:space-y-0 md:space-x-10 min-h-screen">
      <img
        src={home}
        alt="Home"
        className="w-full md:w-1/2 h-auto rounded-lg"
      />
      <div className="flex flex-col w-full md:w-1/2 space-y-6 text-center md:text-left items-center md:items-start max-w-md">
        <p className="text-2xl md:text-4xl lg:text-4xl font-bold">
          Broaden your Horizons.
        </p>
        <p className="text-xl md:text-2xl text-gray-700 w-">
          Connect with diverse peers for fresh insights and perspectives on your
          studies.
        </p>
        <button
          className="bg-emerald-900 text-white py-2 px-6 md:py-4 md:px-6 font-bold rounded-2xl text-xl md:text-2xl transition-transform transform hover:scale-105"
          onClick={goToHome4}
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default Home3;
