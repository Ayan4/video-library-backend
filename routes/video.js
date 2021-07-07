const express = require("express");
const router = express.Router();
const { getVideos } = require("../controllers/video");

router.get("/videos", getVideos);

module.exports = router;
