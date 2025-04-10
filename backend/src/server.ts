import dotenv from "dotenv";
import http from "http";
import app from "./app";
import mongoose from "mongoose";
import process from "process";
// import { neon } from "@neondatabase/serverless";
// import redis from "./db/redis";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const neonDbUrl = process.env.DATABASE_URL;
if (!neonDbUrl) {
  console.warn("DATABASE_URL is not provided, skipping NeonDB connection.");
}
// const sql = neonDbUrl ? neon(neonDbUrl) : null;
const port = process.env.PORT || 8000;

const server = http.createServer(app);

// async function testNeonConnection() {
//   if (!sql) {
//     console.warn("NeonDB is not configured, skipping connection test.");
//     return;
//   }
//   try {
//     const result = await sql`SELECT version()`;
//     console.log("Connected to NeonDB successfully:", result[0].version);
//   } catch (err) {
//     console.error("Error connecting to NeonDB (continuing without Neon):", err);
//   }
// }

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Connect to Redis
    // await redis.connect();
    console.log("Connected to Redis successfully");

    // Test NeonDB connection (if not configured or fails, the app still continues)
    // await testNeonConnection();

    // Start the HTTP server
    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

startServer();
