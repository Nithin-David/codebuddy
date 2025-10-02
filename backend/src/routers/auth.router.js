import express from 'express';
import { githubLogin, googleLogin, login, logout, signup } from '../controllers/auth.controller.js';
import { githubCongig } from '../utils/githubConfig.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/google-auth', googleLogin);

router.get('/github', githubCongig);
router.get('/github/callback', githubLogin);

export default router;