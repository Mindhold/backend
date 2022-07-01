const mongoose = require("mongoose");

const Closet = mongoose.model(
    "Closet",
    new mongoose.Schema({
        id: String,
        date: Date,
        info: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }],
        linkedClosets: [{
            type: mongoose.Schema.Types.String,
            ref: "Closet"
        }]
    })
);

module.exports = Closet;