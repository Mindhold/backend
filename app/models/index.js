const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;

module.exports = db;