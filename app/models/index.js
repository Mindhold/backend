const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;
db.closet = require("./closet.model.js");
db.gpe = require("./gpe.model.js");
db.message = require("./message.model.js");
db.project = require("./project.model.js");

module.exports = db;