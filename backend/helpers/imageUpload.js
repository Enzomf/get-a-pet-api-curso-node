const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   

    let fileDir = "";

    if (req.baseUrl.includes("user")) {
      fileDir = "users";
    } else if (req.baseUrl.includes("pet")) {
      fileDir = "pets";
    }

    cb(null, `public/img/${fileDir}`);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
