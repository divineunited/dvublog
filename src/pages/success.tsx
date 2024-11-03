import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { username } = useAuth();

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1>Post Created Successfully!</h1>
        <div style={{ textAlign: "center" }}>
          <Link
            href={`/${username}/posts/${postId}`}
            className="view-post-link"
          >
            View Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
