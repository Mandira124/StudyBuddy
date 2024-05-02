import Logo from "../assets/logo.png";
import Login from "../assets/login.svg?react";

const LoginPage = () => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-1/2 bg-red-500 space-y-16">
        <div className="flex flex-row ml-10 mt-4">
          <img src={Logo} className="size-14" />
          <h1 className="text-3xl font-semibold ml-2 mt-2">studybuddy</h1>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-between items-center border-2 border-emerald-950 w-11/12 rounded-lg h-9/12">
            <h1 className="text-emerald-950 font-bold">Login</h1>
            <div>
              <input />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-1/2">
        <Login className="h-screen size-10/12" />
      </div>
    </div>
  );
};

export default LoginPage;
