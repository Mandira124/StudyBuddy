import React, { useState } from 'react';

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

export function NavBar({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="bg-white shadow w-screen h-16 flex flex-row items-center px-4 justify-between">
      <div className="flex flex-row items-center space-x-20">
        <div className="ml-2 flex flex-row items-center">
          <a href="#">
            <img
              src={imageSrcPath}
              alt={`${brandName} logo`}
              width="40"
              height="40"
              className="d-inline-block align-center"
            />
          </a>
          <div>
            <span className="font-bold text-xl">{brandName}</span>
          </div>
        </div>
        <div className="mr-2 flex flex-row">
          <ul className="flex flex-row space-x-5 text-lg">
            {navItems.map((item, index) => (
              <li
                key={item}
                className={`nav-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <a className="" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row space-x-6 mr-10">
        <a
          className="bg-green-200 p-2 rounded-lg text-black font-bold text-lg"
          href="#"
        >
          Login
        </a>
        <a
          className="bg-green-200 p-2 rounded-lg text-black font-bold text-lg"
          href="#"
        >
          Register
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
