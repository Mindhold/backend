const mongoose = require("mongoose");

const Priority = mongoose.model(
    "Priority",
    new mongoose.Schema({
        id: String,
        title: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }]
    })
);

module.exports = Priority;