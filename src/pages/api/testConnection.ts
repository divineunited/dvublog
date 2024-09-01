import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const db = await connectToDatabase();
    res
      .status(200)
      .json({ message: "Connected to the database successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error connecting to the database", error });
  }
};
