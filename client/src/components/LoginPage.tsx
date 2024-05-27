import Login from "../assets/login.svg?react";
import Logo from "../assets/logo.png";

const LoginPage = () => {
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <div className="flex w-11/12 h-5/6 shadow-2xl">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-row justify-start items-center">
            <img src={Logo} className="size-14" />
            <h1 className="text-xl font-semibold">studybuddy</h1>
          </div>

          <div className="flex flex-row flex-1">
            <div className="flex max-w-2/5 flex-col">
              <div className="flex flex-col items-center p-4">
                <h1 className="text-xl font-bold">
                  Ready to fire your neurons?
                </h1>
                <h3 className="text-sm text-slate-400 mt-2">
                  Enter your account details
                </h3>
              </div>

              <form className="flex flex-col items-center">
                <label className="flex flex-col p-3 flex-1">
                  <h1 className="text-lg font-semibold self-start py-2">
                    Email
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full p-1 border-2 rounded-base focus:outline-none rounded-md text-sm"
                  />
                </label>
              </form>

              <form className="flex flex-col items-center">
                <label className="flex flex-col p-3 flex-1">
                  <h1 className="text-lg font-semibold self-start py-2">
                    Password
                  </h1>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-1 border-2 rounded-base focus:outline-none rounded-md text-sm"
                  />
                </label>
              </form>

              <div className="flex flex-col justify-around gap-5 items-center">
                <div className="flex justify-evenly p-3 w-2/3">
                  <div className="flex items-center">
                    <input type="checkbox" />
                    <h1 className="ml-1 text-xs">Remember me</h1>
                  </div>
                  <div className="flex">
                    <h1 className="text-xs">Forgot Password?</h1>
                  </div>
                </div>

                <div className="flex justify-center items-center border border-emerald-900 bg-emerald-900 w-7/12 self-center h-10 rounded-lg">
                  <h1 className="text-slate-200">LogIn</h1>
                </div>

                <div className="flex justify-center items-center p-3">
                  <h1 className="text-sm">
                    Don't have an account?
                    <span className="text-sm font-bold">Sign Up</span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center max-w-3/5 h-full">
              <Login className="max-w-7/12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
