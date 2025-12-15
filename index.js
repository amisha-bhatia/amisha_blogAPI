const dotenv=require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const helmet=require("helmet"); 
const rateLimiter=require("express-rate-limit");
const YAML=require("yamljs");
const swaggerUi=require("swagger-ui-express");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(helmet());

const limiter=rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests, try again later"});

app.use(limiter);


app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
const swaggerDocuments=YAML.load("./docs/swagger.yaml");
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocuments));
app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port http://localhost:${process.env.PORT}`)
);




