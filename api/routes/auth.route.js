import express from 'express'
import { google, Signin, signOut, Signup } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sign_up',Signup)
router.post('/sign_in',Signin)
router.post('/google',google)
router.get('/signout', signOut); 

export default router;
