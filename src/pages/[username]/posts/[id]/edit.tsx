import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormValues {
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  isEarly: boolean;
}

const EditPostPage = () => {
  const router = useRouter();
  const { id, username } = router.query;
  const { username: currentUser, isLoggedIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    summary: "",
    content: "",
    publishedAt: "",
    isEarly: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && username) {
      axios
        .get(`/api/${username}/posts/${id}`)
        .then((response) => {
          const post = response.data.data;
          setInitialValues({
            title: post.title,
            summary: post.summary,
            content: post.content,
            publishedAt: post.publishedAt
              ? new Date(post.publishedAt).toISOString().slice(0, 16)
              : new Date(post.createdAt).toISOString().slice(0, 16),
            isEarly: post.isEarly || false,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          setError("Failed to fetch post");
          setIsLoading(false);
        });
    }
  }, [id, username]);

  useEffect(() => {
    // Redirect if user is not logged in or not the author
    if (!isLoading && (!isLoggedIn || currentUser !== username)) {
      router.push(`/${username}/posts/${id}`);
    }
  }, [isLoading, isLoggedIn, currentUser, username, id, router]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(60, "Title cannot be more than 60 characters")
      .required("Please provide a title for this post."),
    summary: Yup.string().required("Please provide a summary for this post."),
    content: Yup.string().required("Please provide content for this post."),
    publishedAt: Yup.date().nullable(),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/${username}/posts/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        router.push(`/${username}/posts/${id}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post");
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="content-wrapper">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="content-wrapper">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1>Edit Post</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="create-post-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <Field
                  as="textarea"
                  id="summary"
                  name="summary"
                  placeholder="Enter post summary"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  placeholder="Enter post content"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="publishedAt">
                  Publication Date and Time - UTC Timezone (used for sort order)
                </label>
                <Field
                  type="datetime-local"
                  id="publishedAt"
                  name="publishedAt"
                />
                <ErrorMessage
                  name="publishedAt"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="isEarly">
                  <Field type="checkbox" id="isEarly" name="isEarly" />
                  Mark as an Early Post
                </label>
                <ErrorMessage
                  name="isEarly"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-buttons">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Post"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => router.push(`/${username}/posts/${id}`)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPostPage;
