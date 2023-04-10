var accountModel = require('../../models/accounts.model');

exports.listUser = async (req, res, next) => {
    try {
        let list = await accountModel.find();
        if (list) {
            return res.status(200).json({ status: 200, msg: 'Lấy dữ liệu thành công!', data: list });
        } else {
            return res.status(204).json({ status: 204, msg: 'Không có dữ liệu' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, msg: error.message });
    }
}


exports.login = async (req, res, next) => {
    try {
        const user = await accountModel.findByCredentials(req.body.username, req.body.password);

        if (!user) {
            return res.status(401).json({ status: 401, error: 'Sai thông tin đăng nhập' });
        }
        // mỗi lần đăng nhập thành công, tạo token làm việc mới
        await user.generateAuthToken();
        return res.status(200).json({ status: 200, data: user })

    } catch (error) {
        return res.status(500).json({ status: 500, msg: error.message });
    }
}


exports.reg = async (req, res, next) => {
    try {

        const user = new accountModel(req.body);
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(req.body.password, salt);
        let new_user = await user.save();
        return res.status(201).json({ status: 201, msg: 'Đăng ký thành công !', data: new_user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, msg: error.message });
    }
}


exports.profile = (req, res, next) => {
    res.json({ status: 200, msg: 'Trang thông tin', data: req.user });
}


exports.logout = async (req, res, next) => {
    try {
        console.log(req.user);
        req.user.token = null; //xóa token
        await req.user.save()
        return res.status(200).json({ status: 200, msg: 'Đăng xuất thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, msg: error.message });
    }
}
