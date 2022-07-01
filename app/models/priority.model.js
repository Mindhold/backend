const mongoose = require("mongoose");

const Priority = mongoose.model(
    "Priority",
    new mongoose.Schema({
        id: String,
        title: String
    })
);

module.exports = Priority;