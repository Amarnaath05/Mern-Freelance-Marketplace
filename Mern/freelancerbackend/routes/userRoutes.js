const express = require('express');
const router = express.Router();

const { signup, login, signupClient, loginClient } = require('./controllers/authController');

router.post('/signup', signup);

router.post('/login', login);

router.post('/signup-client', signupClient);

router.post('/loginclient', loginClient);

module.exports = router;
