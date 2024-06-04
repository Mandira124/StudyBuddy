import React from 'react';
import { NavLink,Link } from 'react-router-dom';

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

export function NavBar({ brandName, imageSrcPath, navItems }: NavBarProps) {
  return (
    <nav className="bg-white shadow w-full h-16 flex items-center px-4 justify-between">
      <div className="flex items-center space-x-6 md:space-x-20">
        <NavLink to="home1" className="flex items-center space-x-2">
          <img
            src={imageSrcPath}
            alt={`${brandName} logo`}
            width="40"
            height="40"
            className="inline-block"
          />
          <span className="font-bold text-xl">{brandName}</span>
        </NavLink>
        <ul className="hidden md:flex space-x-5 text-lg">
         
          {navItems.map((item) => (
            <li key={item} className="nav-item">
              <NavLink
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `hover:text-green-700 ${isActive ? 'selected' : ''}`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4 md:space-x-6">
        <NavLink
          to="/loginpage"
          className={({ isActive }) =>
            `bg-green-200 p-2 rounded-lg text-black font-bold text-lg ${isActive ? 'selected' : ''} hover:bg-green-300`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `bg-green-200 p-2 rounded-lg text-black font-bold text-lg ${isActive ? 'selected' : ''} hover:bg-green-300`
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
