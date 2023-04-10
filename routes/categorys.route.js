var express = require('express');
var router = express.Router();

var categoryController = require('../controllers/categorys.controller');
var login = require('../middlewares/login');

// thiết lập bắt buộc phải login
router.use(login.check_login);

router.get('/', categoryController.list);
router.post('/', categoryController.list);

router.get('/add', categoryController.add);
router.post('/add', categoryController.add);

router.get('/edit/:idcategory', categoryController.edit);
router.post('/edit/:idcategory', categoryController.edit);

router.get('/delete/:idcategory', categoryController.delete);
router.post('/delete/:idcategory', categoryController.delete);

module.exports = router;