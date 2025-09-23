const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authToken');

router.post('/login', authController.login);
router.get('/profile', authMiddleware.authToken, authController.profile);

module.exports = router;