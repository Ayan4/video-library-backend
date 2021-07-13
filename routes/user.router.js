const express = require("express");
const router = express.Router();
const { userSignUp, userLogin } = require("../controllers/user.controller");
// const {
//   createDefaultPlaylists
// } = require("../middleware/createPlaylist.middleware");

router.post("/signup", userSignUp);
router.post("/login", userLogin);

module.exports = router;
