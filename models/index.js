// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();
const db_user = process.env.DB_USER || '';
const db_pass = process.env.DB_PASS || '';
const db_name = process.env.DB_NAME || '';
const db_host = process.env.DB_HOST || '';
// console.log(db_host);
mongoose.connect(db_host, {
    useNewUrlParser: true,
    user: db_user,
    pass: db_pass,
    authSource: db_name,
});

const db = mongoose.connection;
const userProfileSchema = new mongoose.Schema(
    {},
    { collection: 'userprofile', strict: false }
);
const userAuthSchema = new mongoose.Schema(
    {},
    { collection: 'userauth', strict: false }
);
db.userprofile = mongoose.model('userprofile', userProfileSchema);
db.userauth = mongoose.model('userauth', userAuthSchema);

module.exports = db;
