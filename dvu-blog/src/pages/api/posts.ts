import { NextApiRequest, NextApiResponse } from "next";

const posts = [
  {
    id: "1",
    title: "First Mock Post Title",
    content: "This is the mocked out content of the first post.",
  },
  {
    id: "2",
    title: "Second Mock Post Title",
    content: "This is the mocked out content of the second post.",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(posts);
}
