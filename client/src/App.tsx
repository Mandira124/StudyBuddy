import NavBar from "./pages/NavBar";
import RegisterPage from "./pages/auth/RegisterPage";
import Profile from "./pages/profile";
import LoginPage from "./pages/auth/LoginPage";
import logo from "./assets/logo.png"
import { Outlet } from "react-router-dom";
import CommunityPosts from "./pages/CommunityPost";
import Chat from "./pages/chat";



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
//   // return <CommunityPosts/>
// }

    // <div className="flex flex-col min-h-screen">
    //   <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //   <main className="flex-grow">
    //   <Outlet />
      
    //   </main>
    // </div>
    <Profile/>
  );
};


export default App;
