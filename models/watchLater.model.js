const mongoose = require("mongoose");

const watchLaterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, "can't add playlist without a name"]
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("WatchLaterVideo", watchLaterSchema);
