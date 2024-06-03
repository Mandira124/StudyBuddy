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
