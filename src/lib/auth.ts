import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export const verifyToken = async (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
};
