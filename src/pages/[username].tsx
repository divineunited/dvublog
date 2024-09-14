import PostList from "@/components/PostList";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username) {
      fetchPosts();
      checkAuthentication();
    }
  }, [username]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/${username}`);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("User not found");
      } else {
        setError("Failed to fetch posts. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsOwnProfile(decodedToken.username === username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Explore {username}&apos;s Corner</h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <>
          <p>No posts yet</p>
          {isOwnProfile && (
            <Link href="/create-post" className="post-link">
              Create Your First Post
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
