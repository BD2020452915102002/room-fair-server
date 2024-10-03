const express = require('express');
const {login, logout} = require("../controller/userController");
const router = express.Router();

router.get('/login', login);
router.post('/logout', logout);

module.exports = router;
