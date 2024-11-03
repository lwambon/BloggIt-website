import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import "./WriteBlog.css";

function WriteBlog() {
  const [BlogTitle, setBlogTitle] = useState("");
  const [blogTitleLength, setBlogTitleLength] = useState(0);
  const [synopsis, setSynopsis] = useState("");
  const [synopsisLength, setSynopsisLength] = useState(0);
  const [body, setBody] = useState("");
  const [bodyLength, setBodyLength] = useState(0);
  const [uploadImage, setUploadImage] = useState("");
  const [visibility, setVisibility] = useState("");
  const [visibilityExplanation, setVisibilityExplanation] = useState("");

  const mutation = useMutation((newBlog) => {
    return fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    });
  });

  useEffect(() => {
    setBlogTitleLength(BlogTitle.length);
  }, [BlogTitle]);

  useEffect(() => {
    setSynopsisLength(synopsis.length);
  }, [synopsis]);

  useEffect(() => {
    setBodyLength(body.length);
  }, [body]);

  useEffect(() => {
    if (visibility === "public") {
      setVisibilityExplanation(
        "Everyone will see and read your blog but won't be able to edit it",
      );
      return;
    }
    if (visibility === "private") {
      setVisibilityExplanation(
        "Only you will be able to see the blog you've created",
      );
      return;
    }
    setVisibilityExplanation("");
  }, [visibility]);

  function handleChangeVisibility(e) {
    setVisibility(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!BlogTitle) {
      toast.error("Title is required", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (!synopsis) {
      toast.error("Synopsis is required", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (!body) {
      toast.error("Body is required", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (!uploadImage) {
      toast.error("Image is required", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    if (!visibility) {
      toast.error("Visibility is required", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    const blogs = {
      BlogTitle,
      synopsis,
      body,
      uploadImage,
      visibility,
    };

    mutation.mutate(blogs);
  }

  return (
    <div className="writing-section">
      <div className="writing-container">
        <h2 className="writing-title">
          Start your journey now by creating a blog..
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
            disabled={mutation.isLoading}
          >
            Create Blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;
