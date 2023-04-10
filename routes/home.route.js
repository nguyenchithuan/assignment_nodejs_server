var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.controller');
var login = require('../middlewares/login');

// thiết lập bắt buộc phải login
router.get('/',login.check_login, homeController.home);

module.exports = router;