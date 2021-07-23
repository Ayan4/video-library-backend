const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth.middleware");
const {
  createPlaylist,
  getPlaylists,
  getSinglePlaylist,
  addToPlaylist,
  removePlaylist,
  removeFromPlaylist
} = require("../controllers/playlist.controller");

router.use("/", authToken);

router.get("/", getPlaylists);
router.get("/:playlistId", getSinglePlaylist);
router.post("/", createPlaylist);
router.post("/:playlistId/:videoId", addToPlaylist);
router.delete("/:playlistId", removePlaylist);
router.delete("/:playlistId/:videoId", removeFromPlaylist);

module.exports = router;
