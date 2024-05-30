import { useState } from "react";
import Login from "../assets/login.svg?react";
import Logo from "../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type == "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex w-11/12 h-5/6 shadow-2xl">
        <div className="flex flex-col flex-1">
          <div className="flex flex-row justify-start items-center bg-cyan-600">
            <img src={Logo} className="size-14" />
            <h1 className="text-xl font-semibold">studybuddy</h1>
          </div>

          <div className="flex flex-row flex-1">
            <div className="flex flex-col flex-1">
              <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-xl font-bold">
                  Ready to fire your neurons?
                </h1>
                <h3 className="text-sm text-slate-400 mt-2">
                  Enter your account details
                </h3>
              </div>

              <div className="flex flex-col flex-[1.5] justify-evenly">
                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-lg font-semibold self-start py-2">
                      Email
                    </h1>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="flex flex-1 p-1 border-2 rounded-base focus:outline-none rounded-md text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </form>

                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-lg font-semibold self-start py-2">
                      Password
                    </h1>
                    <div className="flex flex-row">
                      <input
                        type={type}
                        placeholder="Enter your password"
                        className="flex flex-1 p-1 border-2 rounded-base focus:outline-none rounded-md text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={icon}
                          className="absolute mr-10"
                          onClick={handleToggle}
                        />
                      </span>
                    </div>
                  </label>
                </form>
              </div>

              <div className="flex flex-[2] flex-col gap-3 items-center">
                <div className="flex justify-between items-start space-x-12">
                  <div className="flex items-center">
                    <input type="checkbox" />
                    <h1 className="ml-1 text-xs">Remember me</h1>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-xs">Forgot Password?</h1>
                  </div>
                </div>

                <div className="flex justify-center items-center border border-emerald-900 bg-emerald-900 self-center h-10 rounded-lg">
                  <h1 className="text-slate-200">LogIn</h1>
                </div>

                <div className="flex justify-center items-center">
                  <h1 className="text-sm">
                    Don't have an account?
                    <span className="text-sm font-bold">Sign Up</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
