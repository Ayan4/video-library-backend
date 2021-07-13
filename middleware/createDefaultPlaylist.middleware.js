const Liked = require("../models/Liked.model");
const WatchLater = require("../models/watchLater.model");
const History = require("../models/History.model");

exports.createLikedPlaylist = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await Liked.findOne({ user: id });
    if (!playlist) {
      try {
        const newLikedPlaylist = await new Liked({
          user: id,
          name: "Liked Videos"
        });

        await newLikedPlaylist.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create liked videos playlist"
        });
      }
      next();
    } else {
      await playlist.populate("videos").execPopulate();
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find liked videos playlist"
    });
  }
};

exports.createWatchLaterPlaylist = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await WatchLater.findOne({ user: id });
    if (!playlist) {
      try {
        const newWatchLaterPlaylist = await new WatchLater({
          user: id,
          name: "Watch Later Videos"
        });

        await newWatchLaterPlaylist.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create Watch Later playlist"
        });
      }
      next();
    } else {
      await playlist.populate("videos").execPopulate();
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find Watch Later playlist"
    });
  }
};

exports.createHistory = async (req, res, next) => {
  const id = req.user.userId;
  try {
    const playlist = await History.findOne({ user: id });
    if (!playlist) {
      try {
        const newHistory = await new History({
          user: id,
          name: "History"
        });

        await newHistory.save();
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.message,
          message: "Could not create history"
        });
      }
      next();
    } else {
      await playlist.populate("videos").execPopulate();
      next();
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not find history"
    });
  }
};
