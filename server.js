import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

// Load environment variables
dotenv.config({ path: "C:/Users/gadam/OneDrive/Desktop/Innomatics/healthcare-booking-system/backend/.env" });
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

// Serve static files from the React app in production
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Correctly get __dirname
dotenv.config({ path: path.join(__dirname, ".env") });

// Serve the frontend from the build folder
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    // The following will catch all routes and serve the index.html file (React)
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
    });
} else {
    // In development, React will run on a different server (e.g., port 3000)
    app.get("/", (req, res) => {
        res.send("API server running");
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
