import Post from "@/components/Post";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { id, username } = router.query;
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

  return (
    <div className="container">
      <div className="content-wrapper">
        <Post post={post} />
      </div>
    </div>
  );
};

export default PostPage;
