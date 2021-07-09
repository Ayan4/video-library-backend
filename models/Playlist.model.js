const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, "can't add playlist without a name"]
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
