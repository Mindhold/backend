const mongoose = require("mongoose");

// GPE - Goal/Process/Event
const Gpe = mongoose.model(
    "Gpe",
    new mongoose.Schema({
        id: String,
        due_date: Date,
        duration: String,
        name: String,
        type: String,
        notes: String,
        projectId: {
            type: mongoose.Schema.Types.String,
            ref: "Project"
        },
        prevGpes: [{
            type: mongoose.Schema.Types.String,
            ref: "Gpe"
        }]
    })
);

module.exports = Gpe;