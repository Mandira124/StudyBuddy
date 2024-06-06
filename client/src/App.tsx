import NavBar from "./pages/NavBar";
import RegisterPage from "./pages/auth/RegisterPage";
import Profile from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import logo from "./assets/logo.png"
import { Outlet } from "react-router-dom";
import CommunityPosts from "./pages/CommunityPost";
import Chat from "./pages/chat";
import VerificationPage from "./pages/VerificationPage";




const App = () => {
  let items = ["Home", "Text", "Videochat", "Profile"]
  return (
// <<<<<<< main
//     <div className="flex flex-col min-h-screen">
//       <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//     </div>
//   )
 <VerificationPage/>
// }

    // <div className="flex flex-col min-h-screen">
    //   <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //   <main className="flex-grow">
    //   <Outlet />
      
    //   </main>
    // </div>
    // <NavBar/>
  );
};


export default App;
