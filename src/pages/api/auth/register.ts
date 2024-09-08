import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDatabase();

  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
}
