const Playlist = require("../models/Playlist.model");

exports.createPlaylist = async (req, res) => {
  const id = req.user.userId;
  const playlistName = req.body.name;
  try {
    const newPlaylist = await new Playlist({
      user: id,
      name: playlistName
    });

    await newPlaylist.save();
    res.status(200).json({ success: true, newPlaylist });
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.message,
      message: "Could not create new playlist"
    });
  }
};

exports.getPlaylists = async (req, res) => {
  const id = req.user.userId;
  try {
    let playlists = await Playlist.find({ user: id });
    if (!playlists) {
      res.status(400).json({ status: false, msg: "Playlist doesn't exist" });
    } else {
      playlists = await Promise.all(
        await playlists.map(item => item.populate("videos").execPopulate())
      );
      res.status(200).json({ success: true, playlists });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: "failed to fetch user playlist" });
  }
};

exports.getSinglePlaylist = async (req, res) => {
  const id = req.user.userId;
  const playlistId = req.params.playlistId;

  try {
    let playlist = await Playlist.findOne({ user: id, _id: playlistId });
    playlist = await playlist.populate("videos").execPopulate();
    res.status(200).json({ success: true, playlist });
  } catch (err) {
    res
      .status(200)
      .json({ success: false, message: "could not fetch playlist" });
  }
};

exports.addToPlaylist = async (req, res) => {
  const id = req.user.userId;
  const playlistId = req.params.playlistId;
  const videoId = req.params.videoId;

  try {
    let playlist = await Playlist.findOne({ user: id, _id: playlistId });
    const isVideoPresent = playlist.videos.includes(videoId);

    if (!isVideoPresent) {
      playlist.videos.push({ _id: videoId });
    } else {
      playlist.videos.pull({ _id: videoId });
    }

    playlist = await playlist.save();
    playlist = await playlist.populate("videos").execPopulate();
    res.status(200).json({ success: true, playlist });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, msg: "failed to add video to playlist" });
  }
};

exports.removePlaylist = async (req, res) => {
  const id = req.user.userId;
  const playlistId = req.params.playlistId;

  try {
    await Playlist.deleteOne({ user: id, _id: playlistId });

    let playlists = await Playlist.find({ user: id });
    playlists = await Promise.all(
      await playlists.map(item => item.populate("videos").execPopulate())
    );

    res.status(200).json({
      success: true,
      message: "Playlist Deleted Successfully",
      playlists
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not delete the playlist" });
  }
};

exports.removeFromPlaylist = async (req, res) => {
  const id = req.user.userId;
  const playlistId = req.params.playlistId;
  const videoId = req.params.videoId;

  try {
    let playlist = await Playlist.findOne({ user: id, _id: playlistId });
    const isVideoPresent = playlist.videos.includes(videoId);

    if (isVideoPresent) {
      playlist.videos.pull({ _id: videoId });
    }
    playlist = await playlist.save();
    playlist = await playlist.populate("videos").execPopulate();
    res
      .status(200)
      .json({ success: true, message: "Video Deleted Successfully", playlist });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "could not delete the video" });
  }
};
