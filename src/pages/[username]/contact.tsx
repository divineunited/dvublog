import { useAuth } from "@/contexts/AuthContext";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import WebEntry from "@/models/WebEntry";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface ContactPageProps {
  username: string;
  initialWebEntry?: {
    title?: string;
    content?: string;
  };
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
    pageType: "Contact",
  });

  return {
    props: {
      username,
      initialWebEntry: webEntry
        ? {
            title: webEntry.title || null,
            content: webEntry.content || null,
          }
        : null,
    },
  };
};

const ContactPage = ({ username, initialWebEntry }: ContactPageProps) => {
  const { username: currentUser, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialWebEntry?.title || "");
  const [content, setContent] = useState(
    initialWebEntry?.content || "I have yet to fill in my contact information."
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
        `/api/${username}/web-entries/Contact`,
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
      await axios.delete(`/api/${username}/web-entries/Contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle("");
      setContent("I have yet to fill in my contact information.");
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
            <h1>{title || `Contact ${username}`}</h1>
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
