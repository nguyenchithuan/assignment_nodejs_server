var db = require('./db');

const productSchema = new db.mongoose.Schema(
    {
        product_name: {type: String, require: true},
        description: {type: String},
        price: {type: Number, require: true},
        image: {type: String},
        id_category: {type: db.mongoose.Schema.Types.ObjectId, ref: 'categoryModel'}
    },
    {
        collection: 'products'
    }
);

const categorySchema = new db.mongoose.Schema(
    {
        name: {type: String, require: true}
    },
    {
        collection: 'categorys'
    }
);

let productModel = db.mongoose.model('productModel', productSchema);
let categoryModel = db.mongoose.model('categoryModel', categorySchema);

module.exports = {productModel, categoryModel};