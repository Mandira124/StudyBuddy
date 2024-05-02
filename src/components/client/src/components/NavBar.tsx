import { useState } from "react";
interface NavBarProps {
  brandName: string;

  navItems: string[];
}

export function NavBar({ brandName, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <nav className="sannux bg-white shadow w-screen h-auto flex flex-row items-center p-2 ">
      <div className="ml-2 flex flex-row items-center">
        <a className="" href="#">
          <span className="font-bold text-2xl">{brandName} </span>
        </a>
      </div>

      <div className="mr-2 flex flex-row ">
        <ul className="mb-2 mb-lg-0 flex flex-row space-x-3 ">
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
    </nav>
  );
}
export default NavBar;
