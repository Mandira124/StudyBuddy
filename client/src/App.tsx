import { Outlet, Router, RouterProvider } from "react-router-dom";
import ChatLobby from "./pages/chatlobby";

const App = () => {

  let items = ["Home", "Text", "Videochat", "Profile"];
  return (
    // <<<<<<< main
    //     <div className="flex flex-col min-h-screen">
    //       <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //       <main className="flex-grow">
    //         <Outlet />
    //       </main>
    //     </div>
    //   )
    //  <Chat/>
    // }
    <>
      <RouterProvider router={router} />
    </>

    // <div className="flex flex-col min-h-screen">
    //   <NavBar brandName="StudyBuddy" imageSrcPath={logo} navItems={items} />
    //   <main className="flex-grow">
    // <Outlet />

    //   </main>
    // </div>

    // <NavBar/>
  );

};

export default App;
