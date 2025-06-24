const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// multer 저장 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);  // 확장자
    const base = path.basename(file.originalname, ext); // 확장자를 제외한 이름
    cb(null, base + "-" + Date.now() + ext);  // 중복 방지를 위해 타임스탬프 추가
  },
});

const upload = multer({ storage });

// 실제 업로드 API
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(201).json({ message: "업로드 성공", image_url: imageUrl });
});

module.exports = router;
