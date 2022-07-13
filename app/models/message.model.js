const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        id: String,
        date: Date,
        content: String,
        type: String,
        linkedGoalId: {
            type: mongoose.Schema.Types.String,
            ref: "Gpe"
        },
        projectId: {
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }
    })
);

module.exports = Message;