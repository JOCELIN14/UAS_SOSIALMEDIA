import Post from "../post/Post.jsx";
import "./posts.css";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const {
    isLoading,
    error,
    data: postArray,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => {
      const url = userId ? `/posts?userId=${userId}` : "/posts";
      return makeRequest.get(url).then((res) => res.data);
    },
  });

  return (
    <div className="posts">
      {error ? (
        <div className="error-message">
          <p> Something went wrong!</p>
          <p style={{ fontSize: "14px", color: "gray" }}>
            {typeof error.response?.data === "object" ? JSON.stringify(error.response.data) : (error.response?.data || error.message)}
          </p>
        </div>
      ) : isLoading ? (
        <div className="loading-message">
          <p> Loading posts...</p>
        </div>
      ) : !postArray || postArray.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet.</p>
          <p style={{ fontSize: "14px", color: "gray" }}>
            Be the first to share something!
          </p>
        </div>
      ) : (
        postArray
          .filter((post) => post && post.id)
          .map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
