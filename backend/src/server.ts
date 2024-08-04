import dotenv from "dotenv";
import http from 'http';
import app from "./app";
import mongoose from "mongoose";
import process from "process";

const MONGO_URI = process.env.MONGO_URI as string;

dotenv.config();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URI);
  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer()