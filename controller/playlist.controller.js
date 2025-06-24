// 플레이리스트 요청 처리 로직
const db = require("../db");

// 플레이리스트 생성
exports.createPlaylist = async (req, res) => {
  const { name, subtitle, image_url } = req.body;

  if (!name || !subtitle || !image_url) {
    return res.status(400).json({ message: "name, subtitle, image_url 모두 필요합니다." });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO playlists (name, subtitle, image_url) VALUES (?, ?, ?)",
      [name, subtitle, image_url]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      subtitle,
      image_url,
    });
  } catch (err) {
    res.status(500).json({ message: "플레이리스트 생성 실패", error: err.message });
  }
};

// 플레이리스트 전체 조회
exports.getAllPlaylists = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, subtitle, image_url, created_at FROM playlists ORDER BY created_at ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "조회 실패", error: err.message });
  }
};

// 플레이리스트 상세 조회
exports.getPlaylistById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT id, name, subtitle, image_url, created_at FROM playlists WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "플레이리스트를 찾을 수 없습니다." });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "상세 조회 실패", error: err.message });
  }
};

// 플레이리스트 수정
exports.updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { name, subtitle, image_url } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE playlists 
        SET name = ?, subtitle = ?, image_url = ? 
        WHERE id = ?`,
      [name, subtitle, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 플레이리스트가 존재하지 않습니다." });
    }

    res.json({ message: "플레이리스트 수정 완료" });
  } catch (err) {
    res.status(500).json({ message: "수정 실패", error: err.message });
  }
};

// 플레이리스트 삭제
exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      "DELETE FROM playlists WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 플레이리스트가 존재하지 않습니다." });
    }

    res.json({ message: "플레이리스트 삭제 완료" });
  } catch (err) {
    res.status(500).json({ message: "삭제 실패", error: err.message });
  }
};

// 플레이리스트의 음악 추가
exports.addMusicToPlaylist = async (req, res) => {
  const { id } = req.params; // playlist_id
  const { title, artist, album_art, track_url } = req.body;

  if (!title || !artist || !album_art) {
    return res.status(400).json({ message: "title, artist, album_art는 모두 필수입니다." });
  }

  try {
    await db.execute(
      `INSERT INTO playlist_music (playlist_id, title, artist, album_art, track_url)
        VALUES (?, ?, ?, ?, ?)`,
      [id, title, artist, album_art, track_url || null]
    );

    res.status(201).json({ message: "음악 추가 완료" });
  } catch (err) {
    res.status(500).json({ message: "음악 추가 실패", error: err.message });
  }
};

// 플레이리스트의 음악 조회
exports.getPlaylistDetails = async (req, res) => {
  const { id } = req.params;  // playlist_id

  try {
    // 1) 플레이리스트 정보 조회
    const [playlistRows] = await db.execute(
      `SELECT id, name, subtitle, image_url, created_at  
        FROM playlists WHERE id = ?`,
      [id]
    );

    if (playlistRows.length === 0) {
      return res.status(404).json({ message: "해당 플레이리스트를 찾을 수 없습니다." });
    }

    const playlist = playlistRows[0];

    // 2) 음악 목록 조회
    const [musicRows] = await db.execute(
      `SELECT id, title, artist, album_art, track_url, created_at 
        FROM playlist_music 
        WHERE playlist_id = ? 
        ORDER BY created_at ASC`,
      [id]
    );

    // 3) 종합 응답
    res.json({
      playlist,
      music: musicRows
    });
  } catch (err) {
    res.status(500).json({ message: "상세 조회 실패", error: err.message });
  }
};


// 플레이리스트의 음악 삭제
exports.deleteMusicFromPlaylist = async (req, res) => {
  const { id, musicId } = req.params;

  try {
    const [result] = await db.execute(
      "DELETE FROM playlist_music WHERE id = ? AND playlist_id = ?",
      [musicId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "음악이 존재하지 않거나 이미 삭제됨" });
    }

    res.json({ message: "음악 삭제 완료" });
  } catch (err) {
    res.status(500).json({ message: "음악 삭제 실패", error: err.message });
  }
};
