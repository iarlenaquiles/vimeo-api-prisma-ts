import { Router } from 'express';

import userRouter from './user.routes';
import postRouter from './post.routes';
import videoRouter from './video.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/videos', videoRouter);

export default router;
