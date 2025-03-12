// server.ts (Entry point)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";  
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection test at startup
connectDB().then(() => {
    console.log("Database check complete.");
}).catch(err => {
    console.error("Database check failed:", err);
    process.exit(1); // Stop app if DB connection fails
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));