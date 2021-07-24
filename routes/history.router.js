const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/verifyAuth.middleware");
const {
  createHistory
} = require("../middleware/createDefaultPlaylist.middleware");
const {
  getHistory,
  addToHistory,
  removeFromHistory
} = require("../controllers/history.controller");

router.use("/", authToken);
router.use("/", createHistory);

router.get("/", getHistory);
router.post("/:videoId", addToHistory);
router.delete("/:videoId", removeFromHistory);

module.exports = router;
