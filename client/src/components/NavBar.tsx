import { useState } from "react";
interface NavBarProps {
  brandName: string;
  imageSrcPath:string;
  navItems: string[];
}

export function NavBar({ brandName, navItems, imageSrcPath }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <nav className="bg-white shadow w-screen h-auto flex flex-row items-center p-2 justify-between">
      <div className="flex flex-row items-center p-2 justify-between space-x-20">
      <div className="ml-2 flex flex- row items-center ">
        <a className="" href="#">
         <img
            src={imageSrcPath}
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-center"
          />
          </a>
          <div>
          <span className="font-bold text-2xl">{brandName} </span>
          </div>
      </div>
      <div className="mr-2 flex flex-row ">
        <ul className="mb-2 mb-lg-0 flex flex-row space-x-5 text-2xl ">
          {navItems.map((items, index) => (
            <li
              key={items}
              className="nav-item"
              onClick={() => setSelectedIndex(index)}
            >
              <a className="" href="#">
                {items}
              </a>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="mb-2 mb-lg-0 flex flex-row space-x-6 mr-10 p-2">
              <a className="bg-green-200 p-2 rounded-lg text-black font-bold text-xl p-2" href="#">
                login
                </a>
                <a className="bg-green-200 p-2 rounded-lg text-black font-bold text-xl" href="#">
                Register
                </a>
        </div>
    </nav>
  );
}
export default NavBar;
