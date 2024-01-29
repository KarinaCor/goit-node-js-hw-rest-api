const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,

  filename: (req, file, cb) => {
    const exname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, exname);
    const suffix = crypto.randomUUID();
    console.log(basename);
    cb(null, `${basename}-${suffix}${exname}`);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
