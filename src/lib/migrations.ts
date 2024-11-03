import Post from "@/models/Post";

export async function runMigrations() {
  try {
    console.log("Running migrations...");

    // Migrate publishedAt
    const posts = await Post.find({ publishedAt: { $exists: false } });
    console.log(`Found ${posts.length} posts needing publishedAt migration`);

    for (const post of posts) {
      await Post.updateOne(
        { _id: post._id },
        {
          $set: {
            publishedAt: post.createdAt,
          },
        }
      );
    }

    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    // Don't throw error - we want the app to continue starting up
  }
}
