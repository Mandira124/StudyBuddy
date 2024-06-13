import { Outlet, Router, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/contextapi.tsx";
import Profile from "./pages/profile.tsx";

const App = () => {
  return (

    
      <Outlet />
      


    //return <ChatLobby/>;
  );
};

export default App;
