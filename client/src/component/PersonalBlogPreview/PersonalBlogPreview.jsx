import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./PersonalBlogPreview.css";

function PersonalBlogPreview({ id, BlogTitle, synopsis }) {
  const navigate = useNavigate();

  function redirectForEditing() {
    if (!id) return;
    navigate(`/edit/${id}`);
  }

  return (
    <div className="personalblogpreview-section">
      <div className="preview-container">
        <h3>{BlogTitle}</h3>
        <p>{synopsis}</p>
        <div className="btn">
          <button onClick={redirectForEditing}>
            <FaPen /> update
          </button>
          <button>
            <MdDelete /> delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalBlogPreview;
