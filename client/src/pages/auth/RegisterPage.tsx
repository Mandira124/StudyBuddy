import { useEffect, useRef, useState } from "react";
import Login from "../../assets/register.svg";
import Logo from "../../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import successToast from "../../components/toast/successToast";
import errorToast from "../../components/toast/errorToast";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState("password");
  const navigate = useNavigate();

<<<<<<< HEAD
  const goToLogin = () => {
    navigate("/login");
  };
=======
  const goToLogin=()=>{
    navigate('/login');
    console.log("Navigating");
  }
>>>>>>> bc7c202a42bf7111b933393cf204ee2e669b8d51

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
    // prevents the default action of submitting the form
    e.preventDefault();
    try {
      // returns a promise instead of actual response
      const response = await fetch("http://127.0.0.1:1991/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //returns a promise again instead of the json itself
      const responseData = await response.json();
      console.log("sjdhca", responseData.access_token);
      localStorage.setItem("jwt-token", responseData.access_token);
      console.log(responseData);

      if (response.ok) {
        successToast("User verified and logged in !");
        goToLogin();
      } else {
        console.log("error");
        errorToast("User not found!");
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
    return formData;
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

              <div className="flex flex-col flex-[3] justify-evenly">
                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-xl font-semibold self-start">
                      Username
                    </h1>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required={true}
                      placeholder="Enter your username"
                      className="flex flex-1 p-1 border-2 rounded-base focus:outline-none rounded-md text-base"
                      onChange={handleChange}
                    />
                  </label>
                </form>

                <form className="flex flex-col items-center">
                  <label className="flex flex-col flex-1">
                    <h1 className="text-xl font-semibold self-start">Email</h1>
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
                    <h1 className="text-xl font-semibold self-start">
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

              <div className="flex flex-col flex-[2] justify-start items-center">
                <button
                  className="flex justify-center text-lg items-center border border-emerald-900 bg-emerald-900 self-center h-10 rounded-lg w-1/3 text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  SignUp
                </button>
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

export default RegisterPage;
