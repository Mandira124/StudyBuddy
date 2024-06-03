<<<<<<< HEAD
// import RegisterPage from "./components/RegisterPage";
// import LoginPage from "./components/auth/LoginPage";
// import AuthProvider from "./context/AuthContext";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
// const App = () => {
//   return (
//     <>
//       <Router>
//         <AuthProvider>
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </>
//   );
// };
//
// export default App;

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

export default function App() {
  return <RegisterPage />;
}
=======
import LandingPage from "./components/LandingPage";
import NavBar from "./NavBar/NavBar";
import RegisterPage from "./components/auth/RegisterPage";
import Profile from "./components/profile"
import LoginPage from "./components/auth/LoginPage";
import logo from "./assets/logo.png"

const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
    <div>
      <NavBar brandName="StudyBuddy" imageSrcPath={logo}
    navItems={items} />
    </div>
  )
}

export default App;
>>>>>>> df3eba1f796ef37ebfd8cdce24db6f02ad839b29
