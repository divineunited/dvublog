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
    { setSubmitting, resetForm, setStatus }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("summary", values.summary);
    formData.append("content", values.content);
    if (values.primaryImage) {
      formData.append("primaryImage", values.primaryImage);
    }

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        router.push(`/success?postId=${response.data.data._id}`);
      } else {
        setStatus({ error: "Failed to create post." });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setStatus({ error: "An error occurred while creating the post." });
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
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="summary">Summary</label>
            <Field type="text" name="summary" />
            <ErrorMessage name="summary" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Field as="textarea" name="content" />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div>
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
