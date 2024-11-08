import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import apiBase from "../../utils/apiBase";
import "react-toastify/dist/ReactToastify.css";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./PersonalBlogPreview.css";

function PersonalBlogPreview({ id, BlogTitle, synopsis }) {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: async (id) => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully", {
        theme: "colored",
        duration: 3000,
      });
      QueryClient.invalidateQueries("PersonalBlogs");
    },

    onError: () => {
      toast.error("Blog deleted successfully", {
        theme: "colored",
        duration: 3000,
      });
    },
    enabled: false,
  });

  function redirectForEditing() {
    if (!id) return;
    navigate(`/edit/${id}`);
  }

  function handleDelete() {
    mutate(id);
  }

  return (
    <div className="personalblogpreview-section">
      <div className="preview-container">
        <h3>{BlogTitle}</h3>
        <p>{synopsis}</p>
        <div className="btn">
          <button onClick={redirectForEditing} disabled={isLoading}>
            <FaPen /> update
          </button>
          <button onClick={handleDelete} disabled={isLoading}>
            <MdDelete /> <span>{isLoading ? "please wait..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalBlogPreview;
