var express = require('express');
var router = express.Router();

var apiUserController = require('../../controllers/api/accountApi.controller');
var apiLoginMdw = require('../../middlewares/apiLoginMdw');

router.get('/accounts', apiLoginMdw.api_auth, apiUserController.listUser); // ds u:  /api/users


router.post('/accounts/login', apiUserController.login); // đăng nhập


router.post('/accounts/reg', apiUserController.reg); // đăng ký


router.get('/accounts/profile', apiLoginMdw.api_auth, apiUserController.profile); // lấy thông tin user


router.get('/accounts/logout', apiLoginMdw.api_auth, apiUserController.logout); // đăng xuất


module.exports = router;

