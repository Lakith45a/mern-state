import express from 'express'
import { google, Signin, Signup } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign_up',Signup)
router.post('/sign_in',Signin)
router.post('/google',google)

export default router;
