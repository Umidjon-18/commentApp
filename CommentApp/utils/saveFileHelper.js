const path = require("path");
const multer = require("multer");
const FilePath = path.join(__dirname, "../public/post-images");


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    if(file){
    const ext = file.originalname.split(".")[1];
      cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      cb(null, "nature.jpg");
    }
  },
});

const uploadFile = multer({
  storage: multerStorage,
});

exports.saveSingleImage = uploadFile.single("postPicture");