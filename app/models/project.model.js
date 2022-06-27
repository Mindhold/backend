const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        date: Date,
        title: String
    })
);

module.exports = Project;