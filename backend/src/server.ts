import dotenv from "dotenv";
import https from "https";
import http from "http";
import fs from "fs";
import app from "./app";
import mongoose from "mongoose";
import process from "process";
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";
import redis from "./db/redis";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const neonDbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === "production";

// Conditionally setup PostgreSQL and Neon
let pool: Pool | null = null;
let sql: ReturnType<typeof neon> | null = null;

if (neonDbUrl) {
  try {
    pool = new Pool({ connectionString: neonDbUrl });
    sql = neon(neonDbUrl);
  } catch (error) {
    console.warn("Failed to initialize NeonDB client:", error);
  }
} else {
  console.warn("DATABASE_URL is not provided, skipping NeonDB setup.");
}

// HTTPS options (used only in production)
const httpsOptions = isProduction
  ? {
    key: fs.readFileSync('/etc/letsencrypt/live/gonext.lol/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/gonext.lol/fullchain.pem'),
  }
  : null;

const server = isProduction
  ? https.createServer(httpsOptions!, app)
  : http.createServer(app);

// Optional: test Neon connection
async function testNeonConnection() {
  if (!pool) {
    console.warn("PostgreSQL pool not available. Skipping test.");
    return;
  }

  try {
    const result = await pool.query("SELECT version()");
    console.log("Connected to PostgreSQL successfully:", result.rows[0].version);
  } catch (err) {
    console.error("Error connecting to NeonDB (continuing without Neon):", err);
  }
}

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Try to connect to Redis, but don't fail if it's not available
    if (redis) {
      try {
        // Set a reasonable timeout for Redis connection
        const connectPromise = redis.connect();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Redis connection timeout')), 10000)
        );

        await Promise.race([connectPromise, timeoutPromise]);
        console.log("Connected to Redis successfully");
      } catch (redisError) {
        console.error("Failed to connect to Redis (continuing without Redis):", redisError.message || redisError);
        // Don't exit the process, just continue without Redis
      }
    } else {
      console.warn("Redis is not configured. Skipping Redis connection.");
    }

    // Optional connection test
    await testNeonConnection();

    server.listen(port, () => {
      console.log(`[server]: Server is running at ${isProduction ? "https" : "http"}://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

startServer();
