import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();
  const { username: urlUsername } = router.query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = (
    <>
      {isLoggedIn && (
        <>
          <Link href={`/${username}/create-post`}>Create Post</Link>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </>
      )}
      {urlUsername && (
        <>
          <Link href={`/${urlUsername}/posts`}>Posts</Link>
          <Link href={`/${urlUsername}/early`}>Early Posts</Link>
          <Link href={`/${urlUsername}/about`}>About</Link>
          <Link href={`/${urlUsername}/contact`}>Contact</Link>
        </>
      )}
    </>
  );

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          {isLoggedIn ? (
            <Link href={`/${username}`}>
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </Link>
          ) : (
            urlUsername && <Link href={`/${urlUsername}`}>{urlUsername}</Link>
          )}
        </div>

        <div className="nav-right">{navItems}</div>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-mobile ${isMenuOpen ? "open" : ""}`}>
          {navItems}
        </div>
      </nav>
    </header>
  );
};

export default Header;
