import React from "react";

function register() {
  return (
    <div>
      <div className="container">
        <h1>Register Here</h1>
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
        </form>
        <button className="btn">Login</button>
      </div>
    </div>
  );
}

export default register;
