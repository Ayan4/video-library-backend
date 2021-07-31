const WatchLater = require("../models/watchLater.model");

exports.getWatchLaterPlaylist = async (req, res) => {
  const id = req.user.userId;
  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    watchLaterPlaylist = await watchLaterPlaylist
      .populate("videos")
      .execPopulate();
    res.status(200).json({ success: true, watchLaterPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "failed to fetch watch later playlist" });
  }
};

exports.addToWatchLaterPlaylist = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    const isVideoPresent = watchLaterPlaylist.videos.includes(videoId);

    if (!isVideoPresent) {
      watchLaterPlaylist.videos.push({ _id: videoId });
    } else {
      watchLaterPlaylist.videos.pull({ _id: videoId });
    }

    watchLaterPlaylist = await watchLaterPlaylist.save();
    watchLaterPlaylist = await watchLaterPlaylist
      .populate("videos")
      .execPopulate();
    res.status(200).json({ success: true, watchLaterPlaylist });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "failed to add video to playlist" });
  }
};

exports.removeFromWatchLaterPlaylist = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;

  try {
    let watchLaterPlaylist = await WatchLater.findOne({ user: id });
    const isVideoPresent = watchLaterPlaylist.videos.includes(videoId);

    if (isVideoPresent) {
      watchLaterPlaylist.videos.pull({ _id: videoId });
    }
    watchLaterPlaylist = await watchLaterPlaylist.save();
    watchLaterPlaylist = await watchLaterPlaylist
      .populate("videos")
      .execPopulate();
    res.status(200).json({
      success: true,
      message: "Video Deleted Successfully",
      watchLaterPlaylist
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not delete the video" });
  }
};
