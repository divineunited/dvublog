import { runMigrations } from "@/lib/migrations";
import connectToDatabase from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    await runMigrations();
    res.status(200).json({ message: "Migrations completed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Migration failed", error });
  }
}
