import PostList from "@/components/PostList";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const UserPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { username } = router.query;

  const fetchPosts = useCallback(async () => {
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
  }, [username]);

  const checkAuthentication = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsOwnProfile(decodedToken.username === username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchPosts();
      checkAuthentication();
    }
  }, [username, fetchPosts, checkAuthentication]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>{username}&apos;s posts</h1>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <>
            <p>no posts yet</p>
            {isOwnProfile && (
              <Link href={`/${username}/create-post`} className="post-link">
                create your first post
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPostsPage;
