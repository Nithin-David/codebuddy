import express from 'express';
import { googleLogin, login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/google-auth', googleLogin);

export default router;