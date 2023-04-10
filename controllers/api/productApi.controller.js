var md = require('../../models/products.model');

exports.list = async (req, res, next) => {
    try {
        let listSp = await md.productModel.find().populate('id_category');
        if (listSp) {
            res.status(200).json({
                status: 200,
                msg: 'Lấy dữ liệu thành công!',
                data: listSp
            });
        } else {
            res.status(204).json({
                status: 204,
                msg: 'Không có dữ liệu!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: 'Danh sách sản phẩm'
        });
    }
}