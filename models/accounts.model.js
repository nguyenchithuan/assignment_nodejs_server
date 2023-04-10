var db = require('./db');

const jwt = require('jsonwebtoken')  ;//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt"); // cài npm install bcrypt --save

const accountSchema = new db.mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        avata: { type: String },
        phone: { type: String },
        role: { type: String, require: true },
        token: { type: String }
    },
    {
        collection: 'accounts'
    }
);

// tạo token
accountSchema.methods.generateAuthToken = async function () {
    const user = this;
    // tạo token
    const token = jwt.sign({ _id: user._id, username: user.username }, chuoi_ky_tu_bi_mat);
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save();
    return token;
}


// dùng cho đăng nhập
accountSchema.statics.findByCredentials = async (username, password) => {
    const user = await accountModel.findOne({ username });
    if (!user) {
        throw new Error({ error: 'Không tồn tại user' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Sai password' });
    }
    return user;
}



let accountModel = db.mongoose.model('accountModel', accountSchema);

module.exports = accountModel;