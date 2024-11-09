import { useRouter } from "next/router";

const AboutPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>About {username}</h1>
        <p>This page will be editable by the user.</p>
      </div>
    </div>
  );
};

export default AboutPage;
