import "./Blog.css";
import PersonalBlogsPreview from "../../component/PersonalBlogsPreview/PersonalBlogsPreview";
import Navbar from "../../component/Navbar/Navbar";

function Blogs() {
  return (
    <div>
      <Navbar />
      <div className="blogs-container">
        <PersonalBlogsPreview />
      </div>
    </div>
  );
}

export default Blogs;
