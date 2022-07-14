const mongoose = require("mongoose");

// GPE - Goal/Process/Event
const Gpe = mongoose.model(
    "gpe",
    new mongoose.Schema({
        id: String,
        due_date: Date,
        duration: String,
        completed: Boolean,
        name: String,
        type: String,
        notes: String,
        projectId: {
            type: mongoose.Schema.Types.String,
            ref: "project"
        },
        prevGpes: [{
            type: mongoose.Schema.Types.String,
            ref: "gpe"
        }]
    })
);

module.exports = Gpe;