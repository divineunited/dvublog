import PostList from "@/components/PostList";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const EarlyPostsPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEarlyPosts = useCallback(async () => {
    try {
      // You'll need to modify your API to support fetching early posts
      const response = await axios.get(`/api/${username}/early`);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching early posts", error);
      setError("Failed to fetch early posts");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchEarlyPosts();
    }
  }, [username, fetchEarlyPosts]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main-wrapper">
      <div className="container">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p>No early posts found.</p>
        )}
      </div>
    </div>
  );
};

export default EarlyPostsPage;
