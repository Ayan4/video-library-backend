const express = require("express");
const router = express.Router();
const { getAllVideos, getVideo } = require("../controllers/video.controller");

router.get("/", getAllVideos);
router.get("/:videoId", getVideo);

module.exports = router;
