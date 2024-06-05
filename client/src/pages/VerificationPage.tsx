import Verify from "../assets/veriy.svg";
import "../styles/App.css";
import { useState } from "react";

const VerificationPage = () => {
  const [value, setValue] = useState(new Array(5).fill(""));

  const onChangeHandler = ({ target: { value: inputValue } }, index) => {
    console.log("Enter");
    if (isNaN(value)) return;

    const newValue = [...value];
    newValue[index] = value.slice(-1);
    setValue(newValue);

    console.log(value);
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      <div className="flex flex-1 bg-orange-500">
        <h1 className="text-2xl font-bold">Enter your OTP</h1>
      </div>

      <div className="flex flex-[7] bg-blue-500">
        <div className="flex flex-col flex-1 items-center">
          <div className="flex">
            <h1>Please enter the OTP we sent you!</h1>
          </div>
          <div className="flex">
            <form>
              {value.map((item, index) => (
                <input
                  key={index}
                  value={item}
                  placeholder="0"
                  className="w-20 h-20 p-3 border"
                  onChange={(e) => onChangeHandler(e, index)}
                />
              ))}
            </form>
          </div>
        </div>
        <div className="flex flex-1 bg-cyan-500 justify-center items-center">
          <img src={Verify} className="login" />
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
