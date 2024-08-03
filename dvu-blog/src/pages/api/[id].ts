import { NextApiRequest, NextApiResponse } from "next";

const posts = [
  {
    id: "1",
    title: "First Post",
    content: "This is the mocked content of the first post.",
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the mocked content of the second post.",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = posts.find((post) => post.id === id);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}
