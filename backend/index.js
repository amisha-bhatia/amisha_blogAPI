// index.js
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Trust proxy (needed for rate limiter if behind proxy)
app.set("trust proxy", 1);

// Enable CORS for API routes
app.use(
  cors({
    origin: "http://localhost:3000", // React app
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(helmet());

// Rate limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // allow more requests for dev
  message: "Too many requests, try again later",
});
app.use(limiter);

// ----------------------------
// Serve uploads folder with proper CORS
// ----------------------------
app.use("/uploads", (req, res, next) => {
  // Add CORS headers for React app
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
}, express.static(path.join(__dirname, "uploads")));

// ----------------------------
// API routes
// ----------------------------
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Swagger documentation
const swaggerDocuments = YAML.load("./docs/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
