import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redis: ReturnType<typeof createClient> | null = null;

if (process.env.REDIS_URL) {
  redis = createClient({ url: process.env.REDIS_URL });

  redis.on("error", (err) => {
    console.error("Redis Error:", err);
  });

  // Gracefully close the Redis connection on process termination
  const gracefulShutdown = () => {
    console.log("Closing Redis connection...");
    redis!.quit().then(() => {
      console.log("Redis connection closed. Exiting process.");
      process.exit(0);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
} else {
  console.warn("REDIS_URL not provided. Skipping Redis initialization.");
}

// Export the Redis client (or null if not initialized)
export default redis;
