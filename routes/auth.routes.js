const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/auth.controller');
const authMiddleware = require('./../middleware/auth');

router.post('/', AuthController.login);
router.get('/user', authMiddleware, AuthController.user_info);

module.exports = router;
