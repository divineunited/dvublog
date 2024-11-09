import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { GetServerSideProps } from "next";

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
        <h1>
          {username.charAt(0).toUpperCase() + username.slice(1)}&apos;s Homepage
        </h1>
        <p>Welcome to my corner of the internet!</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
