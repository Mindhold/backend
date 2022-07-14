const mongoose = require("mongoose");

const Priority = mongoose.model(
    "priority",
    new mongoose.Schema({
        id: String,
        title: String
    })
);

module.exports = Priority;