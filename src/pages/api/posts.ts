import { verifyToken } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { Storage } from "@google-cloud/storage";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Extend NextApiRequest to include file property
interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

const isProduction = process.env.NODE_ENV === "production";

const storage = isProduction
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: "./public/uploads",
      filename: (req, file, cb) => {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
      },
    });

const upload = multer({
  storage,
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
        const posts = await Post.find({})
          .sort({ createdAt: -1 })
          .populate("author", "username");
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const user = await verifyToken(req);
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }

        await runMiddleware(req, res, uploadMiddleware);

        const { title, summary, content } = req.body;

        // Server-side validation
        if (!title || !summary || !content) {
          return res
            .status(400)
            .json({ success: false, message: "Missing required fields" });
        }

        let primaryImage = "";
        if (req.file) {
          if (isProduction) {
            primaryImage = await uploadToCloudStorage(req.file);
          } else {
            // Local development: use the local file path
            primaryImage = `/uploads/${req.file.filename}`;
          }
        }

        const newPost = new Post({
          title,
          summary,
          content,
          primaryImage,
          author: user._id,
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(400).json({
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
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

async function uploadToCloudStorage(
  file: Express.Multer.File
): Promise<string> {
  const storage = new Storage();
  const bucket = storage.bucket(process.env.GCS_BUCKET_NAME as string);
  const fileName = `${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;
      resolve(publicUrl);
    });

    stream.end(file.buffer);
  });
}
