import { Outlet } from "react-router-dom";
import CommentPage from "./pages/comment";
import ChatForm from "./pages/ChatForm";
import ChatLobby from "./pages/chatlobby";

const App = () => {
  const postId = 1
  // return <Outlet />;
  return <ChatLobby />;
};

export default App;



