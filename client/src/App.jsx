import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import Hero from "./component/Hero/Hero";
import WriteBlog from "./pages/WriteBlog/WriteBlog";
import ExploreBlog from "./pages/ExploreBlog/ExploreBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Login from "./component/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Hero />

      <Routes>
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/explore" element={<ExploreBlog />} />
        <Route path="/blogs" element={<MyBlogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
