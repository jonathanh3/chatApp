import { Router } from "express";
import registerRoute from './register.mjs';
import authRoute from './auth.mjs';

const router = Router();

router.use(registerRoute);
router.use(authRoute);

export default router;
