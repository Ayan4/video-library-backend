const express = require("express");
const router = express.Router();
// const { userSignUp, userLogin } = require("../controllers/user.controller");

router.get("/playlist", getPlaylists);
// router.post("/login", userLogin);

module.exports = router;
