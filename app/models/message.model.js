const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        id: String,
        date: Date,
        content: String,
        type: String,
        linkedGoals: [{
            type: mongoose.Schema.Types.String,
            ref: "Gpe"
        }],
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }]
    })
);

module.exports = Message;