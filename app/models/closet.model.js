const mongoose = require("mongoose");

const Closet = mongoose.model(
    "Closet",
    new mongoose.Schema({
        date: Date,
        info: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        linkedClosets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Closet"
        }]
    })
);

module.exports = Closet;