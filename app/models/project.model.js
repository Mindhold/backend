const mongoose = require("mongoose");

const Project = mongoose.model(
    "project",
    new mongoose.Schema({
        id: String,
        title: String,
        color: String,
        priorityId: {
            type: mongoose.Schema.Types.String,
            ref: "priority"
        }
    })
);

module.exports = Project;