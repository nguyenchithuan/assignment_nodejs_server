const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/asignment_server')
    .catch(err => {
        console.log('---------- Lỗi kết nối server: ' + err);
    });

module.exports = {mongoose};