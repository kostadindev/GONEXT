import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL
});


// Log errors instead of throwing
redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

// Gracefully close the Redis connection on process termination
const gracefulShutdown = () => {
  console.log("Closing Redis connection...");
  redis.quit().then(() => {
    console.log("Redis connection closed. Exiting process.");
    process.exit(0);
  });
};

// Handle termination signals (Ctrl+C, etc.)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Export the Redis client
export default redis;
