import { useState } from "react";
import Login from "../../assets/login.svg";
import Logo from "../../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import errorToast from "../../components/toast/errorToast";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";




const LoginPage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const goToLanding = () => {
    navigate("/landing");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("Called");
    localStorage.removeItem("username");
    // prevents the default action of submitting the form
    e.preventDefault();
    try {
      // returns a promise instead of actual response
      const response = await fetch("http://127.0.0.1:1991/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      // returns a promise again instead of the json itself
      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const responseData = await response.json();

      console.log("access token from response: ", responseData.access_token);
      localStorage.setItem("jwt-token", responseData.access_token);
      console.log("user", responseData)
      localStorage.setItem("username", responseData.username);
      localStorage.setItem("userid", responseData.id.$oid);

      if (response.ok) {
        console.log("logged in");
        goToLanding();
      }

    } catch (err) {
      errorToast(err);
      console.log(err);
    }

  };




  const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
    console.log("called");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:1991/api/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type" : "application/json,"
  //         },
  //         body:
  //       }
  //     )
  //   }
  // };

  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex w-11/12 h-5/6 shadow-2xl">
        <div className="flex flex-col flex-1 content-evenly">
          <div className="flex flex-row items-center flex-1">
            <img src={Logo} className="size-14 ml-5" />
            <h1 className="text-xl font-semibold">studybuddy</h1>
          </div>

          <div className="flex flex-row flex-[7] main-page">
            <div className="flex flex-col flex-1">
              <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                  Ready to fire your neurons?
                </h1>
                <h3 className="text-base text-slate-400 mt-2">
                  Enter your account details
                </h3>
              </div>

              <div className="flex flex-col flex-[1.5] justify-evenly">
                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-xl font-semibold self-start ps-2">
                      Email
                    </h1>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required={true}
                      placeholder="Enter your email"
                      className="flex flex-1 p-1 border-2 rounded-base focus:outline-none rounded-md text-base"
                      onChange={handleChange}
                    />
                  </label>
                </form>

                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-xl font-semibold self-start ps-2">
                      Password
                    </h1>
                    <div className="flex flex-row">
                      <input
                        type={type}
                        name="password"
                        id="password"
                        required={true}
                        placeholder="Enter your password"
                        className="flex flex-1 p-1 border-2 rounded-base focus:outline-none rounded-md text-base"
                        onChange={handleChange}
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

              <div className="flex flex-[2] flex-col justify-evenly items-center">
                <div className="flex justify-between items-start space-x-12 flex-1">
                  <div className="flex items-center">
                    <input type="checkbox" />
                    <h1 className="ml-1 text-sm">Remember me</h1>
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-sm">Forgot Password?</h1>
                  </div>
                </div>

                <div className="flex flex-col flex-[2] justify-start items-center">
                  <button
                    className="flex justify-center text-lg items-center border border-emerald-800 bg-emerald-800 self-center h-10 rounded-lg w-full text-white"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    LogIn
                  </button>

                  <div className="flex justify-center items-center">
                    <h1 className="text-base">
                      Don't have an account?
                      <button
                        className="text-base font-bold"
                        type="submit"
                        onClick={goToRegister}
                      >
                        Sign Up
                      </button>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <img src={Login} className="login" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
