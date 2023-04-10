let accountModel = require('../models/accounts.model');
let bcrypt = require('bcrypt');
let fs = require('fs');

// Login account
exports.login = async (req, res, next) => {
    let msg = '';
    if(req.method == "POST") {
        try {
            let objAccount = await accountModel.findOne({username: req.body.username});
            if(objAccount != null) {
                let check_login = await bcrypt.compare(req.body.password, objAccount.password);
                if(check_login) {
                    req.session.accountLogin = objAccount;
                    return res.redirect('/');
                } else {
                    msg = "Mật khẩu không đúng !";
                }
            } else {
                msg = "Tài khoản không tồn tại !";
            }
        } catch (error) {
            msg = error.message;
        }
    }
    res.render('settings/login.ejs', {msg});
}

// Add account
exports.register = async (req, res, next) => {
    let msg = '';
    if(req.method == 'POST') {
        console.log(req.file);
        let objAccount = new accountModel();
        objAccount.username = req.body.username;
        objAccount.email = req.body.email;
        let salt = await bcrypt.genSalt(15);
        objAccount.password = await bcrypt.hash(req.body.password, salt);
        fs.renameSync(req.file.path, './public/images/' + req.file.originalname);
        objAccount.avata = 'http://localhost:3000/images/' + req.file.originalname;
        objAccount.phone = req.body.phone;
        objAccount.role = req.body.role;

        try {
            if(req.body.password == req.body.re_password) {
                let new_account = await objAccount.save();
                msg = 'Đăng ký thành công!'
            } else {
                msg = 'Re-password và password không khớp!'
            }
            
        } catch {
            msg = 'Lỗi server!'
        }
    }
    res.render('settings/register.ejs', {msg});
}

// Đăng xuất
exports.logout = async (req, res, next) => {
    req.session.accountLogin = null;
    res.redirect('../../');
}

