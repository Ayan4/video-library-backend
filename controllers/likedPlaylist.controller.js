const Liked = require("../models/Liked.model");

exports.getLikedPlaylist = async (req, res) => {
  const id = req.user.userId;
  try {
    let likedPlaylist = await Liked.findOne({ user: id });
    likedPlaylist = await likedPlaylist.populate("videos").execPopulate();
    res.status(200).json({ success: true, likedPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "failed to fetch liked playlist" });
  }
};

exports.addToLikedPlaylist = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let likedPlaylist = await Liked.findOne({ user: id });
    const isVideoPresent = likedPlaylist.videos.includes(videoId);

    if (!isVideoPresent) {
      likedPlaylist.videos.push({ _id: videoId });
    } else {
      likedPlaylist.videos.pull({ _id: videoId });
    }

    likedPlaylist = await likedPlaylist.save();
    likedPlaylist = await likedPlaylist.populate("videos").execPopulate();
    res.status(200).json({ success: true, likedPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "failed to add video to playlist" });
  }
};

exports.removeFromLikedPlaylist = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let likedPlaylist = await Liked.findOne({ user: id });
    const isVideoPresent = likedPlaylist.videos.includes(videoId);

    if (isVideoPresent) {
      likedPlaylist.videos.pull({ _id: videoId });
    }
    await likedPlaylist.save();
    res
      .status(200)
      .json({ success: true, message: "Video Deleted Successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not delete the video" });
  }
};
