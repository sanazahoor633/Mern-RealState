import express from 'express'
import { signIn, signOut, signUp, signUpWithGoogle } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', signUpWithGoogle);
router.get('/signout', signOut)




export default router