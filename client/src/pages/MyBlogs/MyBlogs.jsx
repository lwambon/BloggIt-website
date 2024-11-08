import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiBase from "../../utils/apiBase";
import "./MyBlogs.css";
import Navbar from "../../component/Navbar/Navbar";

function MyBlogs() {
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while fetching the blog.",
        );
      }

      const data = await response.json();
      console.log(data);
      return data;

      //return response.json();
    },
  });

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="myblogs-section">
        <div className="myblogs-container">
          <h2 className="myblogs-title">{data.BlogTitle}</h2>
          <div className="authors-info">
            <p>
              Auther: {data.user.firstName} {data.user.lastName}
            </p>
            <p>Date Created:{new Date(data.CreatedAt).toDateString()}</p>
            <p>Updated Created:{new Date(data.UpdatedAt).toDateString()}</p>
          </div>
          <p className="blogs-sub-heading">{data.synopsis}</p>
          <p className="data-body">{data.body}</p>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
