const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/users').post(userController.postUser);
router.router('/users/me').post(userController.getUser);

module.exports = router;