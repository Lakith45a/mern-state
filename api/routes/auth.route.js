import express from 'express'
import { Signup } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign_up',Signup)

export default router;
