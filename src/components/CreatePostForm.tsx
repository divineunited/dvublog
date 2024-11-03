import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

interface FormValues {
  title: string;
  summary: string;
  content: string;
  primaryImage: File | null;
}

const CreatePostForm = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    summary: "",
    content: "",
    primaryImage: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(60, "Title cannot be more than 60 characters")
      .required("Please provide a title for this post."),
    summary: Yup.string().required("Please provide a summary for this post."),
    content: Yup.string().required("Please provide content for this post."),
    primaryImage: Yup.mixed().nullable(),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("summary", values.summary);
    formData.append("content", values.content);
    if (values.primaryImage) {
      formData.append("primaryImage", values.primaryImage);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({ error: "You must be logged in to create a post." });
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        router.push(`/success?postId=${response.data.data._id}`);
      } else {
        setStatus({ error: "Failed to create post." });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setStatus({ error: "Unauthorized. Please log in again." });
        // Optionally, you can redirect to the login page here
        // router.push('/login');
      } else {
        setStatus({ error: "An error occurred while creating the post." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue }) => (
        <Form className="create-post-form">
          {status && status.error && <p className="error">{status.error}</p>}
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
            <ErrorMessage name="summary" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Enter post content"
            />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="primaryImage">Primary Image</label>
            <input
              id="primaryImage"
              name="primaryImage"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) => {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  setFieldValue("primaryImage", event.currentTarget.files[0]);
                }
              }}
            />
            <ErrorMessage
              name="primaryImage"
              component="div"
              className="error"
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;
