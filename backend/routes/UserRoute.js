import express from 'express';
import { getUsers, getUserById, createUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)


export default router;