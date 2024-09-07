import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/create-post">Create a New Post</Link>
      </nav>
    </header>
  );
};

export default Header;
