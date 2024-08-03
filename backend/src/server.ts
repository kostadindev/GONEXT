import dotenv from "dotenv";
const http = require('http');
const app = require('./app');

dotenv.config();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});