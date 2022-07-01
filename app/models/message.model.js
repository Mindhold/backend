const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        id: String,
        date: Date,
        content: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }]
    })
);

module.exports = Message;