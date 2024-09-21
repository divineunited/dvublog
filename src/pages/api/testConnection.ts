// To Test Database Connections - access: http://localhost:3000/api/testConnection
import connectToDatabase from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
}
