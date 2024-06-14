import { useState } from "react";
import Login from "../../assets/login.svg";
import Logo from "../../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import successToast from "../../components/toast/successToast";
import errorToast from "../../components/toast/errorToast";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
=======



>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
const LoginPage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const goToCommunityPost = () => {
    navigate("/CommunityPost");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState("password");

<<<<<<< HEAD
  const handleToggle = () => {
    if (type === "password") {
=======

  const handleToggle = () => {
    if (type == "password") {
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
=======
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("Called");
    // prevents the default action of submitting the form
    e.preventDefault();
    try {
      // returns a promise instead of actual response
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
      const response = await fetch("http://127.0.0.1:1991/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
<<<<<<< HEAD
=======

>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
        },
        body: JSON.stringify(formData),
      });

<<<<<<< HEAD
=======

      // returns a promise again instead of the json itself
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const responseData = await response.json();
<<<<<<< HEAD
      localStorage.setItem("jwt-token", responseData.access_token);

=======
      
      console.log("access token from response: ", responseData.access_token);
      localStorage.setItem("jwt-token", responseData.access_token);
      
      
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
      if (response.ok) {
        console.log("logged in");
        goToCommunityPost();
      }
<<<<<<< HEAD
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleChange = (e) => {
=======

    } catch (err) {
      errorToast(err);
      console.log(err);
    }

  };




  const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
    console.log("called");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

<<<<<<< HEAD
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex w-11/12 h-5/6 shadow-2xl">
        <div className="flex flex-col flex-1">
          <div className="flex items-center p-4">
            <img src={Logo} alt="Logo" className="w-14 h-14" />
            <h1 className="text-xl font-semibold ml-4">StudyBuddy</h1>
          </div>
          <div className="flex flex-row flex-1 main-page">
            <div className="flex flex-col flex-1 p-4">
=======
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
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
              <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                  Ready to fire your neurons?
                </h1>
                <h3 className="text-base text-slate-400 mt-2">
                  Enter your account details
                </h3>
              </div>
<<<<<<< HEAD
              <form
                className="flex flex-col flex-1 justify-evenly"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col mb-4">
                  <label className="text-xl font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="p-2 border rounded-md focus:outline-none text-base"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-xl font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={type}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Enter your password"
                      className="p-2 border rounded-md focus:outline-none text-base w-full"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FontAwesomeIcon
                        icon={icon}
                        onClick={handleToggle}
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <button className="text-sm">Forgot Password?</button>
                </div>
=======

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

>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
                <div className="flex flex-col flex-[2] justify-start items-center">
                  <button
                    className="flex justify-center text-lg items-center border border-emerald-800 bg-emerald-800 self-center h-10 rounded-lg w-full text-white"
                    type="submit"
<<<<<<< HEAD
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center">
              <img
                src={Login}
                alt="Login Illustration"
                className="max-w-full"
              />
=======
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
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
