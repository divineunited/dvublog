import Post from "@/components/Post";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { id, username } = router.query;
  const { username: currentUser, isLoggedIn } = useAuth();
  const [post, setPost] = useState<{
    title: string;
    content: string;
    primaryImage?: string;
    author: {
      username: string;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && username) {
      axios
        .get(`/api/${username}/posts/${id}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching post", error);
          setError("Post not found");
        });
    }
  }, [id, username]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${username}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push(`/${username}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  const handleEdit = () => {
    router.push(`/${username}/posts/${id}/edit`);
  };

  if (error)
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  if (!post)
    return (
      <div className="container">
        <p>loading...</p>
      </div>
    );

  const isAuthor = isLoggedIn && currentUser === post.author.username;

  return (
    <div className="container">
      <div className="content-wrapper">
        {isAuthor && (
          <div className="post-actions">
            <button onClick={handleEdit} className="edit-button">
              edit post
            </button>
            <button onClick={handleDelete} className="delete-button">
              delete post
            </button>
          </div>
        )}
        <Post post={post} />
      </div>
    </div>
  );
};

export default PostPage;
