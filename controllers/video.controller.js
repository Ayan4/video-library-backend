const Video = require("../models/Video.model");

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    res.status(200).json({ success: true, video });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.postComment = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;
  try {
    let video = await Video.findById(videoId);
    video.comments.push({
      user: id,
      name: req.body.name,
      comment: req.body.comment
    });
    video = await video.save();
    const allVideos = await Video.find({});
    res
      .status(200)
      .json({ success: true, message: "Comment added", allVideos });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to add comment" });
  }
};

exports.deleteComment = async (req, res) => {
  const id = req.user.userId;
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;
  try {
    let video = await Video.findById(videoId);
    const userComments = video.comments
      .map(item => {
        if (item.user == id) {
          return item;
        }
      })
      .filter(item => item != null);

    userComments.id(commentId).remove();
    video = await video.save();
    const allVideos = await Video.find({});
    res
      .status(200)
      .json({ success: true, message: "Comment deleted", allVideos });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to delete comment" });
  }
};

exports.postVideo = async (req, res) => {
  try {
    const videoInfo = req.body;
  } catch (err) {
    res.json({ success: false });
  }
};
