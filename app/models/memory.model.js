const mongoose = require("mongoose");

const Memory = mongoose.model(
    "Memory",
    new mongoose.Schema({
        id: String,
        info: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }],
        linkedMemories: [{
            type: mongoose.Schema.Types.String,
            ref: "Memory"
        }]
    })
);

module.exports = Memory;