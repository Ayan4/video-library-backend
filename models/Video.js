const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  description: String,
  uploaderImg: String,
  channelName: String
});

module.exports = mongoose.model("Video", videoSchema);
