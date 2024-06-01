import React from "react";
import home from "../assets/home2.png";

const Home2 = () => {
  return (
    <div className="flex flex-1 w-11/12 items-center justify-between space-x-10  ml-40">
        <img src={home} alt="Home" className="size-3/6 " />
        <div className="flex flex-col w-2/6 space-y-7"> 
        <p className="text-6xl font-bold w-3/4">Discover the joy of peer-to-peer learning</p>
        <p className="text-4xl w-2/4 ">Reignite your passion, and explore new concepts.</p>
        <div className="h-20">
        </div>
        <button className="bg-green-900 text-white py-4 px-4 w-2/4  font-bold rounded-2xl text-4xl">
            NEURONS FIRE
        </button>
        </div>  
    </div>
  );
};

export default Home2;
