import "./Blog.css";
import PersonalBlogsPreview from "../../component/PersonalBlogsPreview/PersonalBlogsPreview";
import Navbar from "../../component/Navbar/Navbar";

function Blogs() {
  return (
    <div>
      <Navbar />
      <div>
        <PersonalBlogsPreview />
      </div>
    </div>
  );
}

export default Blogs;
