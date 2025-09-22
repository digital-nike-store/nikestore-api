const userMiddleware = require('../middlewares/users');
const userController = require('../controllers/users.controller')
const express = require('express');
const router = express.Router();


router.post('/', userMiddleware.validateCreateUser, userController.createUser);

module.exports = router;