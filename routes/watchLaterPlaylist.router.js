const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth.middleware");
const {
  createWatchLaterPlaylist
} = require("../middleware/createDefaultPlaylist.middleware");
const {
  getWatchLaterPlaylist,
  addToWatchLaterPlaylist,
  removeFromWatchLaterPlaylist
} = require("../controllers/watchLater.controller");

router.use("/", authToken);
router.use("/", createWatchLaterPlaylist);

router.get("/", getWatchLaterPlaylist);
router.post("/:videoId", addToWatchLaterPlaylist);
router.delete("/:videoId", removeFromWatchLaterPlaylist);

module.exports = router;
