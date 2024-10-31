import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./pages/Home/Home";
import WriteBlog from "./pages/WriteBlog/WriteBlog";
import ExploreBlog from "./pages/ExploreBlog/ExploreBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Profile from "./pages/MyProfile/Profile";
import Login from "./component/Login/Login";
import Signup from "./component/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/explore" element={<ExploreBlog />} />
        <Route path="/blogs" element={<MyBlogs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
