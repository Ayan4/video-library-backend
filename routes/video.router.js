const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  getVideo,
  postComment,
  deleteComment
} = require("../controllers/video.controller");
const { authToken } = require("../middleware/verifyAuth.middleware");

router.get("/", getAllVideos);
router.get("/:videoId", getVideo);
router.post("/comment/:videoId", authToken, postComment);
router.delete("/comment/:videoId/:commentId", authToken, deleteComment);

module.exports = router;
