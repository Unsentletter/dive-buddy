const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');

const userController = require('../controllers/userController');

router.route('/user/signup').post(userController.postUser);
router.route('/user/loggedIn').get(authenticate, userController.getUser);
router.route('/user/login').post(userController.loginUser);
router.route('/user/loggedIn/deleteUser').delete(authenticate, userController.deleteUser);
router.route('/user/profile').post(authenticate, userController.updateProfile);

module.exports = router;