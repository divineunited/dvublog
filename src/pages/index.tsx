import PostList from "@/components/PostList";
import axios from "axios";
import { useEffect, useState } from "react";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Cheries Art Wonderland</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default IndexPage;
