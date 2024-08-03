import dotenv from "dotenv";
import http from 'http';
import app from "./app";

dotenv.config();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});