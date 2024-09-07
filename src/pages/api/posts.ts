import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Extend NextApiRequest to include file property
interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"));
    }
  },
});

const uploadMiddleware = upload.single("primaryImage");

function runMiddleware(
  req: NextApiRequestWithFile,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        await runMiddleware(req, res, uploadMiddleware);

        const { title, summary, content } = req.body;
        const primaryImage = req.file ? `/uploads/${req.file.filename}` : "";

        const newPost = new Post({
          title,
          summary,
          content,
          primaryImage,
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res
        .status(405)
        .json({ success: false, error: `Method '${req.method}' Not Allowed` });
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
