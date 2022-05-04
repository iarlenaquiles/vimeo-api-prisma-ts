import { Router } from 'express';
import uploads from '../config/multer';

import VideoController from '../controllers/VideoController';

const router = Router();

const videoController = new VideoController();

router.get(`/`, videoController.details);
router.get(`/:videoId`, videoController.getLink);
router.post(`/`,  uploads.single('file'), videoController.store);
router.post(`/access`, videoController.getAccessToken);

export default router;
