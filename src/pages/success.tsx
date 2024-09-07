import Link from "next/link";
import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <h1>Post Created Successfully!</h1>
      <div style={{ textAlign: "center" }}>
        <Link href={`/posts/${postId}`} className="view-post-link">
          View Post
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
