import { useState } from "react";
interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

function NavBar({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            alt=""
            width="50"
            height="50"
            className="d-inline-block align-center"
          />
          <span className="fw-bolder fs-4">{brandName}</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse align-items-center  d-flex flex-column flex-md-row"
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((items, index) => (
              <li
                key={items}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <a className="nav-link active" aria-current="page" href="#">
                  {items}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
