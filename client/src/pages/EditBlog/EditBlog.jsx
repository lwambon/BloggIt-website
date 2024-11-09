import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import apiBase from "../../utils/apiBase";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
import "./EditBlog.css";

function EditBlog() {
  const [BlogTitle, setBlogTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");
  const [BlogsImage, setBlogsImage] = useState("");
  const [visibility, setVisibility] = useState("");
  const [visibilityExplanation, setVisibilityExplanation] = useState("");

  const { blogsId } = useParams();
  const redirect = useNavigate();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["updateBlogs"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${blogsId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setBlogTitle(data.BlogTitle);
      setBlogsImage(data.BlogsImage);
      setSynopsis(data.synopsis);
      setBody(data.body);
      setVisibility(data.visibility);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the blog",
        {
          theme: "colored",
          autoClose: 3000,
        },
      );
    },
  });

  const { mutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: async (updateBlogs) => {
      const response = await fetch(`${apiBase}/blogs/${blogsId}`, {
        method: "PUT",
        body: JSON.stringify(updateBlogs),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Blog updated successfully", {
        theme: "colored",
        autoClose: 3000,
      });
      redirect(`/blogs/${blogsId}`);
    },
    onError: (error) => {
      toast.error(error.message, {
        theme: "colored",
        autoClose: 3000,
      });
    },
  });

  function handleChangeVisibility(e) {
    setVisibility(e.target.value);
    setVisibilityExplanation(
      e.target.value === "public"
        ? "Your blog will be visible to everyone."
        : "Only you can see this blog.",
    );
  }

  const [isUploading, setIsUploading] = useState(false);
  async function handleFile(event) {
    const present_key = "gevuuttq";
    const cloud_name = "ddvzeq4od";
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", present_key);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
      );
      setBlogsImage(res.data.secure_url);
      console.log("Image uploaded:", res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!BlogsImage) {
      toast.error("Please wait for the image to finish uploading", {
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    const blogs = {
      BlogTitle,
      synopsis,
      body,
      BlogsImage,
      visibility,
    };

    mutate(blogs);
  }

  if (isLoading) {
    return <h2 className="isloading">Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2 className="isloading">{error.message}</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="writing-section">
        <div className="writing-container">
          <h2 className="writing-title">Update your Blog...</h2>
          <div className="writing-content">
            <div className="input">
              <label htmlFor="blog-title">Blog Title</label>
              <input
                type="text"
                id="blog-title"
                placeholder="Enter blog title"
                value={BlogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="synopsis">Synopsis</label>
              <input
                type="text"
                id="synopsis"
                placeholder="Enter synopsis"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                required
              />
            </div>

            <div className="input">
              <label htmlFor="body">Body</label>
              <textarea
                id="body"
                placeholder="Write your blog content here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="input">
              <label htmlFor="image-upload">Upload Image</label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFile}
              />
              {BlogsImage && (
                <img
                  src={BlogsImage}
                  alt="Blog Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </div>

            <div className="input">
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                value={visibility}
                onChange={handleChangeVisibility}
                required
              >
                <option value="">Select Visibility</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <small>{visibilityExplanation}</small>
            </div>

            <button
              className="submit-writtenblog"
              onClick={handleSubmit}
              disabled={updateIsLoading || isUploading}
            >
              {updateIsLoading || isUploading
                ? "Loading, please wait..."
                : "Update Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
