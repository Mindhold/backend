const mongoose = require("mongoose");

const Memory = mongoose.model(
    "memory",
    new mongoose.Schema({
        id: String,
        info: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "project"
        }],
        linkedMemories: [{
            type: mongoose.Schema.Types.String,
            ref: "memory"
        }]
    })
);

module.exports = Memory;