const mongoose = require("mongoose");

const Message = mongoose.model(
    "message",
    new mongoose.Schema({
        id: String,
        date: Date,
        content: String,
        isIncoming: Boolean,
        linkedGoalId: {
            type: mongoose.Schema.Types.String,
            ref: "gpe"
        },
        projectId: {
            type: mongoose.Schema.Types.String,
            ref: "project"
        }
    })
);

module.exports = Message;