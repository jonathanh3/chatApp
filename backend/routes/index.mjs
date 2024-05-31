import { Router } from "express";
import registerRoute from './register.mjs';
import authRoute from './auth.mjs';
import roomsRoute from './rooms.mjs';

const router = Router();

router.use(registerRoute);
router.use(authRoute);
router.use(roomsRoute);

export default router;
