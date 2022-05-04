import crypto from 'crypto';
import path, { extname } from 'path';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
    local: {
        storage: multer.diskStorage({
            destination: path.join(tmpFolder, 'video'),
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}${extname(file.originalname)}`;
                return callback(null, fileName);
            },
        }),
    },
};


