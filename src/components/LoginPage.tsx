import React from "react";

function LoginPage() {
  return (
    <>
      <div className="container">
        <h1>Welcome Back!</h1>
        <form>
          <input
            className="formm"
            type="text"
            placeholder="Username"
            required
          ></input>
          <input
            className="formm"
            type="Password"
            placeholder="Password"
            required
          ></input>

          <input id="myinput" type="checkbox"></input>
          <label htmlFor="myinput">Remember Me</label>
          <a className="a1" href="#">
            Forgot Password?
          </a>
        </form>
        <button className="btn">Login</button>
        <p>
          Don't have an account?
          <a className="a2" href="Register.tsx">
            Click here
          </a>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
