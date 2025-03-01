import express from 'express'
import { Signin, Signup } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign_up',Signup)
router.post('/sign_in',Signin)

export default router;
