import express from "express";
import cors from "cors";
import authRoutes from "./router/auth.router.js";
import messageRoutes from "./router/message.router.js";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
    connectDB()
});