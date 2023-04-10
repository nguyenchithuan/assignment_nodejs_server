var express = require('express');
var multer = require('multer'); //  npm install --save multer
var router = express.Router();
var uploader = multer({ dest: '.tmp' }); // đưa vào thư mục tạm, để controller về sau sử lý

var settingsController = require('../controllers/settings.controller');

// Login
router.get('/login', settingsController.login);
router.post('/login', settingsController.login);


// Add account
router.get('/register', settingsController.register);
router.post('/register', uploader.single('avata'), settingsController.register);


module.exports = router;