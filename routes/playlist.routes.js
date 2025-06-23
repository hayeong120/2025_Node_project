// 플레이리스트 API
const express = require("express");
const router = express.Router();
const controller = require("../controller/playlist.controller");

// 플레이리스트 기본 생성, 삭제
router.post("/", controller.createPlaylist);
router.get("/", controller.getAllPlaylists);
router.put("/:id", controller.updatePlaylist);
router.delete("/:id", controller.deletePlaylist);

// 플레이리스트 조회
router.get("/:id/details", controller.getPlaylistDetails);
router.get("/:id", controller.getPlaylistById);  

// 플레이리스트 노래 생성, 삭제
router.post("/:id/music", controller.addMusicToPlaylist);
router.delete("/:id/music/:musicId", controller.deleteMusicFromPlaylist);

module.exports = router;
