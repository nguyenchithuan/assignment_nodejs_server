let model_sp = require('../models/products.model');

// list
exports.list = async (req, res, next) => {
    let dieu_kien_sort = null;
    let type = req.query.type;
    
    if(typeof(req.query.sort) != 'undefined') {
        console.log(req.query.sort);
        dieu_kien_sort = {[req.query.column]: req.query.type}
    }

    let listCategory = await model_sp.categoryModel.find().sort(dieu_kien_sort);

    res.render('categorys/list_category.ejs', { listCategory, type});
}

// add
exports.add = async (req, res, next) => {
    let msg = '';

    if (req.method == 'POST') {
        let objCategory = new model_sp.categoryModel();
        objCategory.name = req.body.name;

        try {
            await objCategory.save();
            msg = 'Thêm thành công!'
        } catch {
            msg = 'Lỗi server!'
        }
    }

    res.render('categorys/add_category.ejs', { msg });
}

// Update
exports.edit = async (req, res, next) => {
    let msg = '';

    let idcategory = req.params.idcategory;
    let objCategory = await model_sp.categoryModel.findById(idcategory);

    if (req.method == 'POST') {
        let objCategory = new model_sp.categoryModel();
        objCategory.name = req.body.name;

        objCategory._id = idcategory;

        try {
            await model_sp.categoryModel.findByIdAndUpdate({ _id: idcategory }, objCategory);
            msg = 'Thêm thành công!'
        } catch {
            msg = 'Lỗi server!'
        }
    }

    res.render('categorys/edit_category.ejs', { msg, objCategory });
}

// delete
exports.delete = async (req, res, next) => {
    let idcategory = req.params.idcategory;

    let listProduct = await model_sp.productModel.find();
    let check = false; // kiểm tra nếu tồn tại id_catogory ở trong product thì không cho xóa

    try {
        // Check tồn tại id_category
        for (let i = 0; i < listProduct.length; i++) {
            if (idcategory == listProduct[i].id_category) {
                check = true;
            }
        }

        if (!check) {
            await model_sp.categoryModel.findByIdAndDelete({ _id: idcategory });
            console.log('Xóa thành công!');
        } else {
            console.log('Đã tồn tại giá trị trong product!');
        }

    } catch {
        console.log('Lỗi server!');
    }
    res.redirect('../../categorys');
}