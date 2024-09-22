import mongoose from "mongoose";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

const MONGODB_URI =
  serverRuntimeConfig.MONGODB_URI ||
  publicRuntimeConfig.MONGODB_URI ||
  process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!cached) {
    throw new Error("MongoDB connection not initialized");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverApi: {
        version: "1" as const,
        strict: true,
        deprecationErrors: true,
      },
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB successfully!");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
