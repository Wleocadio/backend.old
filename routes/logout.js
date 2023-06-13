const express = require('express');
const router = express.Router();

const authController = require('../login/logout');

router.post('/logout', authController.logout);

module.exports = router;