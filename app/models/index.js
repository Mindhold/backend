const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;
db.memory = require("./memory.model.js");
db.gpe = require("./gpe.model.js");
db.message = require("./message.model.js");
db.project = require("./project.model.js");
db.priority = require("./priority.model.js");

module.exports = db;