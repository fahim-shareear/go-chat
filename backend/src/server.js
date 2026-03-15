import express from "express";
import cors from "cors";
import authRoutes from "./router/auth.router.js";
import messageRoutes from "./router/message.router.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ESM compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Frontend path
const frontendDistPath = path.join(__dirname, "../../frontend/dist");

// Serve React static files
app.use(express.static(frontendDistPath));

// Catch-all for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));