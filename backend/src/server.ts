import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import app from "./app";
import mongoose from "mongoose";
import process from "process";
import { Pool } from "pg";
import redis from "./db/redis";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const port = process.env.PORT || 8443;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// HTTPS options
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/gonext.lol/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/gonext.lol/fullchain.pem')
};

const server = https.createServer(httpsOptions, app);

async function testPostgresConnection() {
  try {
    const result = await pool.query('SELECT version()');
    console.log("Connected to PostgreSQL successfully:", result.rows[0].version);
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
    process.exit(1);
  }
}

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Connect to Redis
    await redis.connect();
    console.log("Connected to Redis successfully");

    // Test PostgreSQL connection
    await testPostgresConnection();

    // Start the HTTPS server
    server.listen(port, () => {
      console.log(`[server]: Server is running at https://gonext.lol:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

startServer();