import Post from "@/components/Post";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((response) => {
          setPost(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching post", error);
        });
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return <Post post={post} />;
};

export default PostPage;
