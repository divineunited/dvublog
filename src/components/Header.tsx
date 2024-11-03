import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();
  const { username: urlUsername } = router.query;

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <Link href={`/${username}`}>{username}</Link>
            <Link href="/create-post">Create Post</Link>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            {urlUsername && <Link href={`/${urlUsername}`}>{urlUsername}</Link>}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
