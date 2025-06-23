// 실제 로직 (외부 API 호출 등)
const axios = require("axios");

exports.searchMusic = async (query) => {
  const response = await axios.get("https://itunes.apple.com/search", {
    params: {
      term: query,
      limit: 10,
      media: "music",
    },
  });

  return response.data.results.map((item) => ({
    title: item.trackName,
    artist: item.artistName,
    album_art: item.artworkUrl100,
    track_url: item.trackViewUrl,
  }));
};
