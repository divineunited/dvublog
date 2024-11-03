import Post from "@/components/Post";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<{
    title: string;
    content: string;
    primaryImage?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null); // Explicitly type error

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching post", error);
          setError("Post not found");
        });
    }
  }, [id]);

  if (error)
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  if (!post)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container">
      <div className="content-wrapper">
        <Post post={post} />
      </div>
    </div>
  );
};

export default PostPage;
