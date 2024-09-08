import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this post."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    summary: {
      type: String,
      required: [true, "Please provide a summary for this post."],
    },
    content: {
      type: String,
      required: [true, "Please provide content for this post."],
    },
    primaryImage: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Delete the model if it exists
mongoose.models = {};

const Post = mongoose.model("Post", PostSchema);

export default Post;
