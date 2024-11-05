import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./BlogsPreview.css";

function BlogsPreview({ id, BlogTitle, synopsis, autherName }) {
  const navigate = useNavigate();

  function handleNavigate() {
    if (!id) {
      return;
    }
    navigate(`/blogs/${id}`);
  }

  return (
    <div className="blogspreview-container">
      <div className="preview-section-details">
        <div className="preview-title">
          <h2 className="preview-blogtitle">{BlogTitle}</h2>
        </div>
        <div className="previewbody">
          <p className="preview-synopsis">{synopsis}</p>
        </div>
        <div className="preview-auther">
          <div className="preview-user">
            <p className="image">
              <FaUser />
            </p>
            <p className="auther-name">created by: {autherName}</p>
          </div>
          <div className="btn-preview">
            <button className="preview-button" onClick={handleNavigate}>
              Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPreview;
