import mongoose from "mongoose";

export enum PageType {
  Home = "Home",
  Post = "Post",
  EarlyPost = "EarlyPost",
  About = "About",
  Contact = "Contact",
}

const WebEntrySchema = new mongoose.Schema(
  {
    pageType: {
      type: String,
      enum: Object.values(PageType),
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    content: {
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

export default mongoose.models.WebEntry ||
  mongoose.model("WebEntry", WebEntrySchema);
