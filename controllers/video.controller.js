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

exports.postVideo = async (req, res) => {
  try {
    const videoInfo = req.body;
  } catch (err) {
    res.json({ success: false });
  }
};
