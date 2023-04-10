var express = require('express');
var multer = require('multer'); //  npm install --save multer
var router = express.Router();
var uploader = multer({ dest: '.tmp' }); // đưa vào thư mục tạm, để controller về sau sử lý


var productsController = require('../controllers/products.controller');
var login = require('../middlewares/login');

// thiết lập bắt buộc phải login
router.use(login.check_login);

router.get('/', productsController.list);
router.post('/', productsController.list);

router.get('/add', productsController.add);
router.post('/add', uploader.single('image'), productsController.add);

router.get('/edit/:idsp', productsController.edit);
router.post('/edit/:idsp', uploader.single('image'), productsController.edit);

router.get('/delete/:idsp', productsController.delete);
router.post('/delete/:idsp', productsController.delete);

router.get('/details/:idsp', productsController.detail);
router.post('/details/:idsp', productsController.detail);

module.exports = router;