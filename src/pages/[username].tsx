import Link from "next/link";
import { useRouter } from "next/router";

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>{username}&apos;s homepage</h1>
        <p>Welcome to my corner of the internet!</p>
        <div className="post-list">
          <Link href={`/${username}/posts`} className="post-link">
            Posts
          </Link>
          <Link href={`/${username}/about`} className="post-link">
            About
          </Link>
          <Link href={`/${username}/contact`} className="post-link">
            Contact
          </Link>
          <Link href={`/${username}/early`} className="post-link">
            Early Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
