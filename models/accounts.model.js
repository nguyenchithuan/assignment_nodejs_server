var db = require('./db');

const accountSchema = new db.mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        avata: { type: String },
        phone: { type: String },
        role: { type: String, require: true }
    },
    {
        collection: 'accounts'
    }
);

let accountModel = db.mongoose.model('accountModel', accountSchema);

module.exports = accountModel;