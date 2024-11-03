import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, username },
    method,
  } = req;

  await connectToDatabase();

  // First, find the user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  switch (method) {
    case "GET":
      try {
        const post = await Post.findOne({
          _id: id,
          author: user._id,
        }).populate("author", "username");

        if (!post) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { title, content, summary, publishedAt } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $set: {
              title,
              content,
              summary,
              publishedAt: publishedAt ? new Date(publishedAt) : null,
            },
          },
          { new: true }
        );

        if (!updatedPost) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: updatedPost });
      } catch (error) {
        console.error("Error updating post:", error);
        res.status(400).json({
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
      break;
    case "DELETE":
      try {
        const deletedPost = await Post.deleteOne({ _id: id, author: user._id });

        if (!deletedPost.deletedCount) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
