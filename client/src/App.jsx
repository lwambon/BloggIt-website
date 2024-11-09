import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
//import Navbar from "./component/Navbar/Navbar";
import Header from "./component/Header/Header";
import Home from "./pages/Home/Home";
import WriteBlog from "./pages/WriteBlog/WriteBlog";
import ExploreBlog from "./pages/ExploreBlog/ExploreBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Blogs from "./pages/Blogs/Blogs";
import Profile from "./pages/MyProfile/Profile";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import EditBlog from "./pages/EditBlog/EditBlog";
import Footer from "./component/Footer/Footer";

const client = new QueryClient();

function Main() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/write" &&
        location.pathname !== "/explore" &&
        location.pathname !== "/blogs" &&
        location.pathname !== "/blogs/:id" &&
        location.pathname !== "/edit/:blogsId" &&
        location.pathname !== "/profile" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/explore" element={<ExploreBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<MyBlogs />} />
        <Route path="/edit/:blogsId" element={<EditBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Navbar/> */}
        <Main />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
