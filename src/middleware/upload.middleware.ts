import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'output'));
  },
  filename(req, file, cb) {
    const filename = `temp-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const UploadMiddleware = multer({ storage });

export default UploadMiddleware;
