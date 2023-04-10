let accountModel = require('../models/accounts.model');
let fs = require('fs');
let bcrypt = require('bcrypt');


// List account
exports.list = async (req, res, next) => {
    let username_search = req.body.username;
    let dieu_kien_search = null;

    if(typeof(username_search) != 'undefined' && username_search.length > 0) {
        dieu_kien_search = {username: username_search};
    }

    // sort
    let dieu_kien_sort = null;
    let type = req.query.type;
    
    if(typeof(req.query.sort) != 'undefined') {
        console.log(req.query.sort);
        dieu_kien_sort = {[req.query.column]: req.query.type}
    }

    let listAccounts = await accountModel.find(dieu_kien_search).sort(dieu_kien_sort);

    res.render('accounts/list_account.ejs', { listAccounts, type });
}

// addAccount và Register là 1 => sang file Register để thao tác



// Update account
exports.edit = async (req, res, next) => {
    let msg = '';

    let id_account = req.params.id_account;
    let objAccount = await accountModel.findById(id_account);

    if (req.method == 'POST') {
        let objAccount = new accountModel();
        objAccount.username = req.body.username;
        objAccount.email = req.body.email;
        let salt = await bcrypt.genSalt(15);
        objAccount.password = await bcrypt.hash(req.body.password, salt);
        fs.renameSync(req.file.path, './public/images/' + req.file.originalname);
        objAccount.avata = 'http://localhost:3000/images/' + req.file.originalname;
        objAccount.phone = req.body.phone;
        objAccount.role = req.body.role;

        // thêm cho nó cái id của accont muốn thay đổi
        objAccount._id = id_account;

        try {
            if (req.body.password == req.body.re_password) {
                await accountModel.findByIdAndUpdate({ _id: id_account }, objAccount);
                msg = 'Thay đổi thành công thành công!'
            } else {
                msg = 'Re-password và password không khớp!'
            }

        } catch {
            msg = 'Lỗi server!'
        }
    }
    res.render('accounts/edit_account.ejs', { msg, objAccount });
}

// delete account
exports.delete = async (req, res, next) => {
    let id_account = req.params.id_account;
    try {
        await accountModel.findByIdAndDelete({ _id: id_account });
    } catch {
        console.log('Lỗi server!');
    }
    res.redirect('../../accounts');
}