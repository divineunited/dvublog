import axios from "axios";
import { useEffect, useState } from "react";
import PostList from "../components/PostList";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Divine United - Engineering Life</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
