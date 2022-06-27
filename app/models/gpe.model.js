const mongoose = require("mongoose");

// GPE - Goal/Process/Event
const Gpe = mongoose.model(
    "Gpe",
    new mongoose.Schema({
        date: Date,
        deadline: Date,
        duration: String,
        gpe: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        prevGpes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gpe"
        }]
    })
);

module.exports = Gpe;