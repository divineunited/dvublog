import Link from "next/link";

const IndexPage = () => {
  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Welcome to The Creative Entrypoint</h1>
        <div className="cta-container">
          <Link href="/register" className="cta-button">
            Register
          </Link>
          <Link href="/login" className="cta-button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
