// 플레이리스트 API
const express = require("express");
const router = express.Router();
const controller = require("../controller/playlist.controller");

router.post("/", controller.createPlaylist);
router.get("/", controller.getAllPlaylists);
router.get("/:id", controller.getPlaylistById);
router.post("/:id/music", controller.addMusicToPlaylist);
router.delete("/:id/music/:musicId", controller.deleteMusicFromPlaylist);

module.exports = router;
