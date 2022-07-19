const multer = require('multer');
const path = require('path');
const { failed } = require('../helpers/response');

// management file
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.jpg' || ext === '.png' || ext === 'jpeg') {
      cb(null, true);
    } else {
      const error = {
        message: 'File must be jpg, jpeg or png',
      };
      cb(error, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('photo');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 400,
        message: err.message,
        error: 'Bad Request',
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
