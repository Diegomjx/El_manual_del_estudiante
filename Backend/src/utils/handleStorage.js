import multer  from "multer";


const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); //TODO pdf / jpeg / mp3
      const fileName = Date.now(); //TODO 12312321321
      cb(null, `${fileName}.${ext}`); //TODO 123123213232.pdf
    },
    destination: function (res, file, cb) {
      cb(null, `./public`);
    },
  });

  const storagejs = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); //TODO pdf / jpeg / mp3
      const fileName = Date.now(); //TODO 12312321321
      cb(null, `${fileName}.json`); //TODO 123123213232.pdf
    },
    destination: function (res, file, cb) {
      cb(null, `./public`);
    },
  });

  const upload = multer({ storage });
  const uploadjs = multer({ storagejs });

module.exports = {upload, uploadjs};