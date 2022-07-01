const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        id: String,
        title: String
    })
);

module.exports = Project;