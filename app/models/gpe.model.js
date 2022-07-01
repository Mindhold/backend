const mongoose = require("mongoose");

// GPE - Goal/Process/Event
const Gpe = mongoose.model(
    "Gpe",
    new mongoose.Schema({
        id: String,
        date: Date,
        deadline: Date,
        duration: String,
        gpe: String,
        projects: [{
            type: mongoose.Schema.Types.String,
            ref: "Project"
        }],
        prevGpes: [{
            type: mongoose.Schema.Types.String,
            ref: "Gpe"
        }]
    })
);

module.exports = Gpe;