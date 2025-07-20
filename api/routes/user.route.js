import express from 'express'
import { deleteUser, test, updatedUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUserr.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updatedUser);
router.delete('/delete/:id', verifyToken, deleteUser);




export default router;