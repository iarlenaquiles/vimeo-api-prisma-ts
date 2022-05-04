import { Router } from 'express';
import PostController from '../controllers/PostController';

const router = Router();

const postController = new PostController();

router.get(`/`, postController.list);
router.post(`/`, postController.store);

export default router;
