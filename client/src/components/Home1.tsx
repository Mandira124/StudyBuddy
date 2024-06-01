import React from "react";
import home from "../assets/home1.png";

const Home1 = () => {
  return (
    <div className="flex flex-1 w-11/12 items-center justify-between space-x-10 ml-40 mr-50">
        <div className="flex flex-col w-1/4"> 
          <button className="bg-green-900 text-white py-2 px-4 w-3/4 rounded-full text-4xl">
            Find a Bunny Now
        </button>
        <p className="text-6xl font-bold">Brains Connected to Wifi!</p>
        </div> 
        <img src={home} alt="Home" className="size-3/6 " />
    </div>
  );
};

export default Home1;
