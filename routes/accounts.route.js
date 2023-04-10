var express = require('express');
var router = express.Router();
var multer = require('multer'); //  npm install --save multer
var accountsController = require('../controllers/accounts.controlller');
var uploader = multer({ dest: '.tmp' }); // đưa vào thư mục tạm, để controller về sau sử lý

var login = require('../middlewares/login');

// thiết lập bắt buộc phải login
// router.use(login.check_login);

// List account
router.get('/', accountsController.list);
router.post('/', accountsController.list);


// Update account
router.get('/edit/:id_account', accountsController.edit);
router.post('/edit/:id_account', uploader.single('avata'), accountsController.edit);

// Delete account
router.get('/delete/:id_account', accountsController.delete);
router.post('/delete/:id_account', accountsController.delete);


module.exports = router;