import dotenv from "dotenv";
import http from "http";
import app from "./app";
import mongoose from "mongoose";
import process from "process";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const sql = neon(process.env.DATABASE_URL);
const port = process.env.PORT || 8000;

const server = http.createServer(app);

async function testNeonConnection() {
  try {
    const result = await sql`SELECT version()`;
    console.log("Connected to NeonDB successfully:", result[0].version);
  } catch (err) {
    console.error("Error connecting to NeonDB:", err);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    await testNeonConnection();

    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

startServer();
