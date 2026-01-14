const mongoose = require("mongoose");
const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    console.log("Skipping MongoDB connection in CI");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;