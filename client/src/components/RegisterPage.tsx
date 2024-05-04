import Logo from "../assets/logo.png";
import Login from "../assets/register.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RegisterPage = () => {
  const [eyeClick, setEyeClick] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleClick() {
    setEyeClick((prev) => !prev);
  }

  return (
    <div className="flex flex-row w-screen h-screen justify-center items-center">
      <div className="flex w-11/12 shadow-2xl h-5/6 justify-center flex-wrap">
        <div className="flex flex-col h-full items-center">
          <div className="flex flex-row ml-10 mt-8">
            <img src={Logo} className="size-14" />
            <h1 className="text-3xl font-semibold mr-96 mt-2">studybuddy</h1>
          </div>
          <div className="flex flex-col mt-14 justify-center items-center w-full">
            <h1 className="text-3xl font-bold">Ready to fire your neurons?</h1>
            <p className="text-lg text-slate-400 mt-2">
              Enter your account details
            </p>
          </div>
          <div className="flex flex-col mt-10 justify-center">
            <h1 className="text-xl font-bold">Username</h1>
            <div className="border-2 w-96 mt-4 h-12 flex items-center justify-center rounded-lg">
              <input
                placeholder="Enter your username"
                className="focus:outline-none w-96 ml-4"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          <div className="flex flex-col mt-5 justify-center">
            <h1 className="text-xl font-bold">Email</h1>
            <div className="border-2 w-96 mt-4 h-12 flex items-center justify-center rounded-lg">
              <input
                placeholder="Enter your email"
                className="focus:outline-none w-96 ml-4"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FontAwesomeIcon
                icon={eyeClick ? Icons.faEyeSlash : Icons.faEye}
                className="text-slate-400 mr-2"
                onClick={handleClick}
              />
            </div>
          </div>

          <div className="flex flex-col mt-5 justify-center">
            <h1 className="text-xl font-bold">Repeat Password</h1>
            <div className="border-2 w-96 mt-4 h-12 flex items-center justify-center rounded-lg">
              <input
                placeholder="Repeat your password"
                className="focus:outline-none w-96 ml-4"
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
              />
              <FontAwesomeIcon
                icon={eyeClick ? Icons.faEyeSlash : Icons.faEye}
                className="text-slate-400 mr-2"
                onClick={handleClick}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8 items-center">
            <div className="flex border-2 justify-center w-96 bg-emerald-900 h-14 items-center rounded-lg">
              <h1 className="text-slate-200 text-lg">Register</h1>
            </div>
          </div>

          <div className="flex justify-center mt-8 items-center flex-row">
            <div className="border w-32 border-slate-400"></div>
            <h1 className="text-md mr-2 ml-2">Or continue with email</h1>
            <div className="border w-32 border-slate-400"></div>
          </div>

          <div className="flex flex-row mt-10 w-10/12 justify-around align-center ml-8">
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-14">
              <FontAwesomeIcon icon={Icons.fa6} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-14">
              <FontAwesomeIcon icon={Icons.faBong} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-14">
              <FontAwesomeIcon icon={Icons.faGlobe} />
            </div>
            <div className="border-2 border-slate-200 w-1/5 flex justify-center items-center h-14">
              <FontAwesomeIcon icon={Icons.faGlobe} />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Login className="size-10/12 ml-10" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
