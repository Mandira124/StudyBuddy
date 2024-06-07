import { Outlet } from "react-router-dom";
import CommentPage from "./pages/comment";

const App = () => {
  const postId=1
  return <Outlet />;
  // return <CommentPage postId={postId}/>;
};

export default App;

