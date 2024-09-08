import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <Link href={`/${username}`}>Home</Link>
            <Link href="/create-post">Create Post</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
