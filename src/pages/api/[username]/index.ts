import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      const posts = await Post.find({ author: user._id })
        .sort({ createdAt: -1 })
        .populate("author", "username");
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
