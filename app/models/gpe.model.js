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
        date: Date,
        location: String,
        projectId: {
            type: mongoose.Schema.Types.String,
            ref: "project"
        },
        prevGpeId: {
            type: mongoose.Schema.Types.String,
            ref: "gpe"
        }
    })
);

module.exports = Gpe;