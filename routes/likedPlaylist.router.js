const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth.middleware");
const {
  createLikedPlaylist
} = require("../middleware/createDefaultPlaylist.middleware");
const {
  getLikedPlaylist,
  addToLikedPlaylist,
  removeFromLikedPlaylist
} = require("../controllers/likedPlaylist.controller");

router.use("/", authToken);
router.use("/", createLikedPlaylist);

router.get("/", getLikedPlaylist);
router.post("/:videoId", addToLikedPlaylist);
router.delete("/:videoId", removeFromLikedPlaylist);

module.exports = router;
