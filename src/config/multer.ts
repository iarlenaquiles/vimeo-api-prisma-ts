import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, tmpFolder);
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

export default uploads;

