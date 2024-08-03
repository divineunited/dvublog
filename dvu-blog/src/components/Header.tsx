import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
      <style jsx>{`
        header {
          padding: 20px;
          background: #333;
          color: white;
        }
        nav a {
          margin-right: 10px;
          color: white;
          text-decoration: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
