import express from "express";
import cors from "cors";
import authRoutes from "./router/auth.router.js";
import messageRoutes from "./router/message.router.js";
import dotenv from "dotenv";
import path from "path";

app.use(cors());
app.use(express.json());
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//make ready for production:
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
    })
}

app.listen(port, ()=> console.log(`Server is running on port ${port}`));