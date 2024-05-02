import PropTypes from "prop-types";
import { FaUser, FaLock } from "react-icons/fa";

export default function Form(props: PropTypes.any) {
  return (
    <div className="flex justify-center items-center border-2 border-gray-200 w-72 h-10 rounded-full">
      <input
        type="text"
        name="name"
        // value={props.value}
        placeholder={props.placeholder}
        // onChange={props.onChange}
        className="flex ml-2 focus:outline-none bg-transparent text-white"
      />
      <div className="mr-2">
        {props.placeholder == "Email" ? (
          <FaUser className="text-white" />
        ) : (
          <FaLock className="text-white" />
        )}
      </div>
    </div>
  );
}
