var express = require('express');
var router = express.Router();

var productsApiCrl = require('../../controllers/api/productApi.controller');

// thiết lập bắt buộc phải login
router.get('/products', productsApiCrl.list);

module.exports = router;