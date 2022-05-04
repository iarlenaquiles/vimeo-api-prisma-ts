import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.get(`/`, userController.list);
router.post(`/`, userController.store);

export default router;
