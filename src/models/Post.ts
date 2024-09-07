import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
