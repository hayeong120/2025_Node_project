const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// 업로드된 파일을 static으로 접근 가능하게 설정
app.use("/uploads", express.static("public/uploads"));

const playlistRoutes = require("./routes/playlist.routes");
const musicRoutes = require("./routes/music.routes");
const uploadRoutes = require("./routes/upload.routes");

app.use("/api/playlists", playlistRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
