import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "./PersonalBlogsPreview.css";
import PersonalBlogPreview from "../PersonalBlogPreview/PersonalBlogPreview";
import { usePersonalBlogsStore } from "../../store/PersonalBlogs";

function PersonalBlogsPreview() {
  const blogs = usePersonalBlogsStore((state) => state.blogs);
  const setBlogs = usePersonalBlogsStore((state) => state.setBlogs);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["PersonalBlogs"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/blogs/users", {
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Data received:", data);
      setBlogs(data);
    },
  });

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="personal-blogs">
      <h2 className="personal-blog-title">Your personal blogs</h2>

      <h3 className="create-personal-blog">
        You don't have any blogs yet?{" "}
        <Link to="/WritePage" className="create-blog">
          Click to create one
        </Link>
      </h3>

      <div className="personal-blog-list">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((blog) => (
            <PersonalBlogPreview
              key={blog.id}
              id={blog.id}
              BlogTitle={blog.BlogTitle}
              synopsis={blog.synopsis}
            />
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default PersonalBlogsPreview;
