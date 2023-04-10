const jwt = require('jsonwebtoken')
const accountModel = require('../models/accounts.model');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;

const api_auth = async (req, res, next) => {
    let header_token = req.header('Authorization'); // tách cái header_token

    if (typeof (header_token) == 'undefined') {
        return res.status(403).json({ status: 403, msg: 'Không xác định token' });
    }

    const token = header_token.replace('Bearer ', ''); // tách cái token ra

    try {
        // trả về thông tin user
        const data = jwt.verify(token, chuoi_ky_tu_bi_mat);
        // tìm kiếm trong csdl có token này hay không
        const user = await accountModel.findOne({ _id: data._id, token: token });
        if (!user) {
            throw new Error("Không xác định được người dùng");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error.message });
    }
}
module.exports = { api_auth };
