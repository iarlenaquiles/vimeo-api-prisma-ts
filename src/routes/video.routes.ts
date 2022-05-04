import { Router } from 'express';
import multer from 'multer';
// import multerConfig from '../config/multer';

import VideoController from '../controllers/VideoController';

const router = Router();

const videoController = new VideoController();
const upload = multer({});

router.get(`/`, videoController.details);
router.post(`/`,  upload.single('file'), videoController.store);

export default router;
