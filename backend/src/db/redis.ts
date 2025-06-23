import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redis: ReturnType<typeof createClient> | null = null;

if (process.env.REDIS_URL) {
  try {
    redis = createClient({
      url: process.env.REDIS_URL,
      socket: {
        // Disable automatic reconnection to prevent log spam
        reconnectStrategy: false,
        // Set connection timeout
        connectTimeout: 5000,
      }
    });

    redis.on("error", (err) => {
      console.error("Redis Error:", err.message);
      // Don't crash the application on Redis errors
    });

    redis.on("disconnect", () => {
      console.warn("Redis disconnected");
    });

    // Gracefully close the Redis connection on process termination
    const gracefulShutdown = () => {
      console.log("Closing Redis connection...");
      if (redis && redis.isOpen) {
        redis.quit().then(() => {
          console.log("Redis connection closed. Exiting process.");
          process.exit(0);
        }).catch((err) => {
          console.error("Error closing Redis connection:", err);
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  } catch (initError) {
    console.error("Failed to initialize Redis client:", initError);
    redis = null;
  }
} else {
  console.warn("REDIS_URL not provided. Skipping Redis initialization.");
}

// Helper function to safely execute Redis operations
export const safeRedisOperation = async <T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  if (!redis || !redis.isOpen) {
    console.warn("Redis is not available, operation skipped");
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error("Redis operation failed:", error);
    return fallback;
  }
};

// Export the Redis client (or null if not initialized)
export default redis;
