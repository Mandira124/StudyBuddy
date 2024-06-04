import React from "react";
import home from "../assets/home4.jpg";
import { useNavigate } from "react-router-dom";

const Home4 = () => {
  const navigate= useNavigate();

  const goToLogin=()=>{
    navigate("/loginpage");
  }
  return (
    <div className="flex flex-1 w-11/12 items-center justify-between space-x-10 ml-40">
        <img src={home} alt="Home" className="size-3/5 " />
        <div className="flex flex-col w-2/5 space-y-5"> 
        <p className="text-6xl font-bold ">Transform your study routine.</p>
        <p className="text-5xl w-3/4 ">Connect globally, discuss topics, and achieve academic success.</p>
        <div className="h-20">
        </div>
        <button className="bg-green-900 text-white py-4 px-4 w-2/4  font-bold rounded-2xl text-4xl" onClick={goToLogin}>
            Dive In
        </button>
        </div>  
    </div>
  );
};

export default Home4;
