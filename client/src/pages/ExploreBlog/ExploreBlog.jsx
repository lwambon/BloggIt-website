import "./ExploreBlogs.css";
import { useQuery } from "react-query";
import apiBase from "../../utils/apiBase";
import BlogsPreview from "../../component/BlogsPreview/BlogsPreview";

function ExploreBlog() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["fetchBlogs"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while fetching the blogs.",
        );
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="explore-blogs-section">
      <div className="exploreblogs-container">
        {data.map((blog) => (
          <BlogsPreview
            key={blog.id}
            BlogTitle={blog.BlogTitle}
            synopsis={blog.synopsis}
            autherName={`${blog.user.firstName} ${blog.user.lastName}`}
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ExploreBlog;
