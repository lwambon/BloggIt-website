import "./WriteBlog.css";

function WriteBlog() {
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
              required
            />
          </div>

          <div className="input">
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              id="synopsis"
              placeholder="Enter synopsis"
              required
            />
          </div>

          <div className="input">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              placeholder="Write your blog content here..."
              required
            ></textarea>
          </div>

          <div className="input">
            <label htmlFor="image-upload">Upload Image</label>
            <input type="file" id="image-upload" accept="image/*" />
          </div>

          <div className="input">
            <label htmlFor="visibility">Visibility</label>
            <select id="visibility" required>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <button className="submit-writtenblog">Create Blog</button>
        </div>
      </div>
    </div>
  );
}

export default WriteBlog;
