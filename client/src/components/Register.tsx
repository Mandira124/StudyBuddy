import Logo from "../assets/logo.png";
import Login from "../assets/login.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import Form from "../utils/Form";
import { useState } from "react";

const LoginPage = () => {
  const [eyeClick, setEyeClick] = useState(true);

  function handleClick() {
    setEyeClick((prev) => !prev);
  }

  return (
    <div className="flex flex-row w-screen h-screen justify-center items-center">
      <div className="flex w-11/12 shadow-2xl h-5/6 justify-center">
        <div className="flex flex-col w-2/5 h-full justify-start">
          <div className="flex flex-row ml-10 mt-10">
            <img src={Logo} className="size-14" />
            <h1 className="text-3xl font-semibold ml-2 mt-2">studybuddy</h1>
          </div>
          <div className="flex flex-col mt-32 justify-center items-center w-full">
            <h1 className="text-3xl font-bold">
              Ready to fire your neurons? Log In
            </h1>
            <p className="text-lg text-slate-400 mt-2">
              Enter your account details
            </p>
          </div>
          <div className="flex flex-col mt-10 justify-center ml-36">
            <h1 className="text-md font-bold ml-16">Email</h1>
            <div className="border-2 w-96 ml-16 mt-2 h-12 flex items-center justify-center rounded-lg">
              <input
                placeholder="Enter your email"
                className="focus:outline-none w-96 ml-4"
              />
            </div>
          </div>

          <div className="flex flex-col mt-5 justify-center ml-36">
            <h1 className="text-md font-bold ml-16">Password</h1>
            <div className="border-2 w-96 ml-16 mt-2 h-12 flex items-center justify-center rounded-lg">
              <input
                placeholder="Enter your password"
                className="focus:outline-none w-96 ml-4"
              />
              <FontAwesomeIcon
                icon={eyeClick ? Icons.faEyeSlash : Icons.faEye}
                className="text-slate-400 mr-2"
                onClick={handleClick}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-row mt-4 items-center ml-16 justify-center">
              <input type="checkbox" />
              <h1 className="ml-1 text-xs">Remember me</h1>
            </div>
            <div className="flex flex-row mt-4 mr-16">
              <h1 className="text-xs">Forgot Password?</h1>
            </div>
          </div>

          <div className="flex justify-center mt-8 items-center">
            <div className="flex border-2 justify-center w-80 bg-emerald-900 h-10 items-center rounded-lg">
              <h1 className="text-slate-200">Sign In</h1>
            </div>
          </div>

          <div className="flex flex-row justify-center mt-4">
            <h1 className="text-sm">Don't have an account?</h1>
            <h1 className="text-sm font-bold">Sign Up</h1>
          </div>

          <div className="flex justify-center mt-5 items-center flex-row">
            <div className="border w-24 border-slate-400"></div>
            <h1 className="text-xs mr-2 ml-2">Or continue with email</h1>
            <div className="border w-24 border-slate-400"></div>
          </div>

          <div className="flex flex-row mt-10 w-10/12 justify-around align-center ml-8">
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-10">
              <FontAwesomeIcon icon={Icons.fa6} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-10">
              <FontAwesomeIcon icon={Icons.faBong} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-10">
              <FontAwesomeIcon icon={Icons.faGlobe} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-10">
              <FontAwesomeIcon icon={Icons.faGlobe} />
            </div>
          </div>
        </div>

        <div className="flex w-3/5 items-center h-screen">
          <Login className="size-10/12 ml-10" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
