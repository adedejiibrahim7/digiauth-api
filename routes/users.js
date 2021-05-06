const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/user', userController.index);
router.post('/user/create', userController.signup);

module.exports = router;