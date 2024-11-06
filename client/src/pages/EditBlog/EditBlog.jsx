import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./EditBlog.css";

function EditBlog() {
  const [BlogTitle, setBlogTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [visibility, setVisibility] = useState("");
  const [visibilityExplanation, setVisibilityExplanation] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (blogs) => {
      const response = await fetch("http://localhost:4000/blogs", {
        method: "POST",
        body: JSON.stringify(blogs),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      navigate(`/blogs/${data.id}`);
      toast.success("Notes written successfully", {
        theme: "colored",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while creating the blog",
        {
          theme: "colored",
          autoClose: 3000,
        },
      );
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

  function handleSubmit(e) {
    e.preventDefault();
    const blogs = {
      BlogTitle,
      synopsis,
      body,
      uploadImage,
      visibility,
    };

    mutate(blogs);
  }

  return (
    <div className="writing-section">
      <div className="writing-container">
        <h2 className="writing-title">
          Start your journey now by creating a blog...
        </h2>
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
              onChange={(e) => setUploadImage(e.target.files[0])}
            />
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
            disabled={isLoading}
          >
            {isLoading ? "Loading, please wait..." : "Create Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
