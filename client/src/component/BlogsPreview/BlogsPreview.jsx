import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./BlogsPreview.css";

function BlogsPreview({
  id,
  BlogTitle,
  BlogsImage,
  synopsis,
  autherName,
  profilePicture,
}) {
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

        <div className="blogpreview-image">
          {BlogsImage && (
            <img
              src={BlogsImage}
              alt={`${BlogTitle} image`}
              className="preview-blog-image"
            />
          )}
        </div>

        <div className="previewbody">
          <p className="preview-synopsis">{synopsis}</p>
        </div>

        <div className="preview-auther">
          <div className="preview-user">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Author Profile"
                className="author-profile-picture"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/path/to/default-image.jpg"; // fallback image path
                }}
              />
            ) : (
              <FaUser className="default-user-icon" />
            )}

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
