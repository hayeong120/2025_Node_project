// 음악 검색 요청 처리 로직
const musicService = require("../services/music.service");

// iTunes API 음악 검색
exports.searchMusic = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "검색어가 필요합니다." });

  try {
    const results = await musicService.searchMusic(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "음악 검색 실패", error: err.message });
  }
};
