import React from "react";
import home from "../assets/home3.jpg";

const Home3 = () => {
  return (
    <div className="flex flex-1 w-11/12 items-center justify-between space-x-10 mt-20 ml-40">
        <img src={home} alt="Home" className="size-3/5 " />
        <div className="flex flex-col w-2/5 space-y-5"> 
        <p className="text-6xl font-bold ">Broaden your Horizons.</p>
        <p className="text-5xl w-3/5 ">Connect with diverse peers for fresh insights and perspectives on your studies</p>
        <div className="h-20">
        </div>
        <button className="bg-green-900 text-white py-4 px-4 w-2/4  font-bold rounded-2xl text-4xl">
            Know More
        </button>
        </div>  
    </div>
  );
};

export default Home3;
