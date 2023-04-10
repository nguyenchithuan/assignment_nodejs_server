let model_sp = require('../models/products.model');
let fs = require('fs');

// Danh sách sản phẩm
exports.list = async (req, res, next) => {

    // lộc dữ liệu
    let id_category_search = req.body.id_category;
    let dieu_kien_loc = null;


    if(typeof(id_category_search) != 'undefined' && id_category_search.length > 0) {
        dieu_kien_loc = {id_category: id_category_search};
    }

    //sort
    let dieu_kien_sort = null;
    let type = req.query.type;
    
    if(typeof(req.query.sort) != 'undefined') {
        console.log(req.query.sort);
        dieu_kien_sort = {[req.query.column]: req.query.type}
    }

    let listProduct = await model_sp.productModel.find(dieu_kien_loc).populate('id_category').sort(dieu_kien_sort);
    let listCategory = await model_sp.categoryModel.find();
    

    res.render('products/list_product.ejs', {listProduct, listCategory, type});
}

// Add
exports.add = async (req, res, next) => {
    let msg = '';
    let listCategory = await model_sp.categoryModel.find();

    if(req.method == 'POST') {
        let objProduct = new model_sp.productModel();
        objProduct.product_name = req.body.name;
        objProduct.description = req.body.description;
        objProduct.price = req.body.price;
        fs.renameSync(req.file.path, './public/images/' + req.file.originalname);
        objProduct.image = 'http://localhost:3000/images/' + req.file.originalname;
        objProduct.id_category = req.body.id_category;

        try {
            await objProduct.save();
            msg = "Thêm thành công !";
        } catch {
            msg = "Lỗi server!";
        }
    }

    res.render('products/add_product.ejs', {msg, listCategory});
}

// Update
exports.edit = async (req, res, next) => {
    let msg = '';
    let listCategory = await model_sp.categoryModel.find();

    let idsp = req.params.idsp;
    let objSp = await model_sp.productModel.findById(idsp);
    console.log(objSp);

    if(req.method == 'POST') {
        let objProduct = new model_sp.productModel();
        objProduct.product_name = req.body.name;
        objProduct.description = req.body.description;
        objProduct.price = req.body.price;
        fs.renameSync(req.file.path, './public/images/' + req.file.originalname);
        objProduct.image = 'http://localhost:3000/images/' + req.file.originalname;
        objProduct.id_category = req.body.id_category;

        objProduct._id = idsp;

        try {
            await model_sp.productModel.findByIdAndUpdate({_id: idsp}, objProduct);
            msg = "Thay đổi thành công !";
        } catch {
            msg = "Lỗi server!";
        }
    }

    res.render('products/edit_product.ejs', {msg, listCategory, objSp});
}

// Xóa
exports.delete = async (req, res, next) => {
    let idsp = req.params.idsp;

    try {
        await model_sp.productModel.findByIdAndDelete({_id: idsp});
    } catch {
        console.log('Lỗi server!');
    }

    res.redirect('../../products');
}

// Thông tin chi tiết sản phẩm
exports.detail = async (req, res, next) => {
    let idsp = req.params.idsp;
    let objProduct = await model_sp.productModel.findById(idsp).populate('id_category');
    console.log(objProduct);

    res.render('products/detail_product.ejs', {objProduct});
}

