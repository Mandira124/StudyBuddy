import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import NavBar from "./components/NavBar";

function App() {
  let items = ["Home", "Videochat", "Text", "profile"];

  return (
    <div>
      <NavBar brandName="STUDYBUDDY" navItems={items} />
    </div>
  );
}

export default App;
