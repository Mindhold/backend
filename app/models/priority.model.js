const mongoose = require("mongoose");

const Priority = mongoose.model(
    "Priority",
    new mongoose.Schema({
        title: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }]
    })
);

module.exports = Priority;