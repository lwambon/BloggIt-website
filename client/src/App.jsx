import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./component/Header/Header";
import Home from "./pages/Home/Home";
import WriteBlog from "./pages/WriteBlog/WriteBlog";
import ExploreBlog from "./pages/ExploreBlog/ExploreBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Profile from "./pages/MyProfile/Profile";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/explore" element={<ExploreBlog />} />
          <Route path="/blogs" element={<MyBlogs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
