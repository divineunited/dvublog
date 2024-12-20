import PostList from "@/components/PostList";
import { useAuth } from "@/contexts/AuthContext";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import WebEntry from "@/models/WebEntry";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface UserProfilePageProps {
  username: string;
  exists: boolean;
  initialWebEntry?: {
    title?: string;
    content?: string;
  };
  recentPosts: any[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = params?.username as string;

  await connectToDatabase();
  const user = await User.findOne({ username });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const webEntry = await WebEntry.findOne({
    author: user._id,
    pageType: "Home",
  });

  const recentPosts = await Post.find({
    author: user._id,
    isEarly: { $ne: true },
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  return {
    props: {
      username,
      exists: true,
      initialWebEntry: webEntry
        ? {
            title: webEntry.title || null,
            content: webEntry.content || null,
          }
        : null,
      recentPosts: JSON.parse(JSON.stringify(recentPosts)),
    },
  };
};

const UserProfilePage = ({
  username,
  initialWebEntry,
  recentPosts,
}: UserProfilePageProps) => {
  const { username: currentUser, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialWebEntry?.title || "");
  const [content, setContent] = useState(
    initialWebEntry?.content || "Welcome to my corner of the internet!"
  );
  const [error, setError] = useState<string | null>(null);

  const isOwner = isLoggedIn && currentUser === username;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/${username}/web-entries/Home`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error saving web entry:", error);
      setError("Failed to save changes");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to reset to default content?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${username}/web-entries/Home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle("");
      setContent("Welcome to my corner of the internet!");
      setError(null);
    } catch (error) {
      console.error("Error deleting web entry:", error);
      setError("Failed to reset content");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        {error && <p className="error">{error}</p>}
        {isEditing ? (
          <div className="content-wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title (optional)"
              className="edit-title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="edit-content"
            />
            <div className="button-group">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="content-wrapper">
              {isOwner && (
                <div className="post-actions">
                  <button onClick={handleEdit} className="edit-button">
                    edit page
                  </button>
                  <button onClick={handleDelete} className="delete-button">
                    reset content
                  </button>
                </div>
              )}
              <h1>
                {title ||
                  `${
                    username.charAt(0).toUpperCase() + username.slice(1)
                  }'s Homepage`}
              </h1>
              <p>{content}</p>
            </div>

            <div className="recent-posts-section">
              <h2>My Recent Posts</h2>
              {recentPosts.length > 0 ? (
                <>
                  <PostList posts={recentPosts} />
                  <Link href={`/${username}/posts`} className="view-all-link">
                    View all posts →
                  </Link>
                </>
              ) : (
                <>
                  <p>No posts yet</p>
                  {isOwner && (
                    <Link
                      href={`/${username}/create-post`}
                      className="post-link"
                    >
                      Create your first post.
                    </Link>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
