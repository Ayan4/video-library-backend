const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, "cannot add comment without username"]
    },
    comment: {
      type: String,
      required: [true, "cannot add blank comment"]
    }
  },
  { timestamps: true }
);

const videoSchema = new mongoose.Schema(
  {
    channelDisplayPic: {
      type: String
    },
    channelName: {
      type: String,
      required: "Channel name is required"
    },
    subscribers: {
      type: String,
      required: "subscribers count is required"
    },
    title: {
      type: String,
      required: "Title Is required to add a video"
    },
    description: {
      type: String,
      required: "Description is required"
    },
    videoId: {
      type: String,
      required: "video ID is required to play a video"
    },
    uploadDate: {
      type: String,
      required: "video upload date is required"
    },
    likeCount: {
      type: String,
      required: "video like count is required"
    },
    dislikeCount: {
      type: String,
      required: "video dislike count is required"
    },
    viewCount: {
      type: String,
      required: "video view count is required"
    },
    category: {
      type: String,
      required: "video category is required"
    },
    comments: [childSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
