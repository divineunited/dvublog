import { verifyToken } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import WebEntry from "@/models/WebEntry";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { username, pageType },
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
        const webEntry = await WebEntry.findOne({
          author: user._id,
          pageType,
        });

        res.status(200).json({ success: true, data: webEntry });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const authenticatedUser = await verifyToken(req);
        if (
          !authenticatedUser ||
          authenticatedUser._id.toString() !== user._id.toString()
        ) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }

        const { title, content } = req.body;
        const webEntry = await WebEntry.findOneAndUpdate(
          { author: user._id, pageType },
          { title, content },
          { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: webEntry });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const authenticatedUser = await verifyToken(req);
        if (
          !authenticatedUser ||
          authenticatedUser._id.toString() !== user._id.toString()
        ) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }

        const deletedEntry = await WebEntry.findOneAndDelete({
          author: user._id,
          pageType,
        });

        if (!deletedEntry) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
