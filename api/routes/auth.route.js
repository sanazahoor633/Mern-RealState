import express from 'express'
import { sigIn, signUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', sigIn)


export default router