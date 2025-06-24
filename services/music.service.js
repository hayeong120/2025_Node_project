// 실제 로직 (외부 API 호출 등)
const axios = require("axios");

exports.searchMusic = async (query) => {
  const response = await axios.get("https://itunes.apple.com/search", {
    params: {
      term: query,  // 검색어
      limit: 15,  // 결과 수
      media: "music", // 미디어 타입
    },
  });

  return response.data.results.map((item) => ({
    title: item.trackName,
    artist: item.artistName,
    album_art: item.artworkUrl100,
    track_url: item.trackViewUrl, // iTunes에서 해당 곡으로 이동하는 링크
  }));
};
