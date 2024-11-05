import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import "./MyBlogs.css";

function MyBlogs() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/blogs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
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
    <div className="MyBlogs-section">
      <div className="myblogs-container">
        <h2 className="myblogs-title">{data.BlogTitle}</h2>
        <p className="blogs-sub-heading">{data.synopsis}</p>
        <p className="data-body">{data.body}</p>
      </div>
    </div>
  );
}

export default MyBlogs;
