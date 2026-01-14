const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    image: { type: String },
    likes: { type: [mongoose.Schema.Types.ObjectId],ref:"User", default: []  }
  },
  { timestamps: true }
);

// Index for search
postSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Post", postSchema);