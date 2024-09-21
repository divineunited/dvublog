import mongoose from "mongoose";

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
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
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    mongoose.models = {}; // Clear Mongoose's model cache

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB successfully!");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    // Test the connection
    await cached.conn.connection.db.admin().ping();
    console.log("Pinged your deployment. Connection is working.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
