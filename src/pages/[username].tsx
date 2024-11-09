import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface UserProfilePageProps {
  username: string;
  exists: boolean;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params?.username as string;

  await connectToDatabase();
  const user = await User.findOne({ username });

  if (!user) {
    return {
      notFound: true, // This will automatically show the 404 page
    };
  }

  return {
    props: {
      username,
      exists: true,
    },
  };
};

const UserProfilePage = ({ username }: UserProfilePageProps) => {
  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>{username}&apos;s homepage</h1>
        <p>Welcome to my corner of the internet!</p>
        <div className="post-list">
          <Link href={`/${username}/posts`} className="post-link">
            Posts
          </Link>
          <Link href={`/${username}/early`} className="post-link">
            Early Posts
          </Link>
          <Link href={`/${username}/about`} className="post-link">
            About
          </Link>
          <Link href={`/${username}/contact`} className="post-link">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
