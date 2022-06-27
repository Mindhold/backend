const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        date: Date,
        msg: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }]
    })
);

module.exports = Message;