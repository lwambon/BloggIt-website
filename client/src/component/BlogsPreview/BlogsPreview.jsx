import { useNavigate } from "react-router-dom";
import useUserState from "../../store/userStore";
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
  const user = useUserState((state) => state.user);

  function handleNavigate() {
    if (!id) {
      return;
    }
    navigate(`/blogs/${id}`);
  }

  const authorProfilePic = profilePicture || (user && user.profilePicture);

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : "";
    const lastInitial = lastName ? lastName.charAt(0) : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

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
            {authorProfilePic ? (
              <img
                src={authorProfilePic}
                alt="Author Profile"
                className="author-profile-picture"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-profile.jpg";
                }}
              />
            ) : (
              <div className="avatar">
                {getInitials(user.firstName, user.lastName)}
              </div>
            )}

            <p className="auther-name">By {autherName}</p>
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
