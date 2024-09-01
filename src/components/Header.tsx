import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <style jsx>{`
        header {
          padding: 16px 24px;
          background: linear-gradient(to right, #2c3e50, #3498db);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        nav {
          max-width: 1200px;
          margin: 0 auto;
        }
        nav a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 4px;
          transition: background-color 0.2s ease-in-out;
        }
        nav a:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </header>
  );
};

export default Header;
