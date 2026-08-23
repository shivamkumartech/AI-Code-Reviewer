import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// AI Review Routes
app.use("/ai", aiRoutes);

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
