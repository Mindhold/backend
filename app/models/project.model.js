const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        id: String,
        title: String,
        priorityId: {
            type: mongoose.Schema.Types.String,
            ref: "Priority"
        }
    })
);

module.exports = Project;