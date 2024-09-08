import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    console.log("Login attempt for username:", username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("User found, comparing passwords");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Login successful");
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
}
