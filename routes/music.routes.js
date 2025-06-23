// 음악 검색 API
const express = require("express");
const router = express.Router();
const controller = require("../controller/music.controller");

router.get("/search", controller.searchMusic);

module.exports = router;
