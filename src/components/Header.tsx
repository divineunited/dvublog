import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  const isIndexPage = router.pathname === "/";

  return (
    <header className="header">
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <Link href={`/${username}`}>Home</Link>
            <Link href="/create-post">Create Post</Link>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            {!isIndexPage && (
              <>
                <Link href="/">Home</Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
