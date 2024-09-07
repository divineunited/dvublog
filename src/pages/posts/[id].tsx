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
        .get(`/api/${id}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching post", error);
          setError("Post not found");
        });
    }
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return <Post post={post} />;
};

export default PostPage;
