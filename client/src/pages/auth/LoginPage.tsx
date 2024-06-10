import { useState } from "react";
import Login from "../../assets/login.svg";
import Logo from "../../assets/logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import successToast from "../../components/toast/successToast";
import errorToast from "../../components/toast/errorToast";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState("");

  const goToRegister = () => {
    navigate("/register");
  };

  const goToCommunityPost = () => {
    navigate("/communitypost");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [icon, setIcon] = useState(faEyeSlash);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:1991/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      localStorage.setItem("jwt-token", responseData.access_token);

      await loginCheck();
    } catch (err) {
      errorToast(err.message);
    }
  };

  const loginCheck = async () => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setJwtToken(jwtToken);
    }
    try {
      const response = await fetch("http://127.0.0.1:1991/checksum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwtToken}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        successToast("User verified and logged in!");
        goToCommunityPost();
      } else {
        errorToast("User not found!");
      }
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
              <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                  Ready to fire your neurons?
                </h1>
                <h3 className="text-base text-slate-400 mt-2">
                  Enter your account details
                </h3>
              </div>
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
                <button
                  type="submit"
                  className="bg-emerald-900 text-white p-2 rounded-md w-full"
                >
                  Log In
                </button>
              </form>
              <div className="mt-4 text-center">
                <p>
                  Don't have an account?{" "}
                  <button onClick={goToRegister} className="font-bold">
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
            <div className="flex-1 hidden md:flex items-center justify-center">
              <img
                src={Login}
                alt="Login Illustration"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
