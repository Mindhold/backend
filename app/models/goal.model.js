const mongoose = require("mongoose");

const Goal = mongoose.model(
    "Goal",
    new mongoose.Schema({
        date: Date,
        deadline: Date,
        duration: String,
        goal: String,
        projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        prevGoals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goal"
        }]
    })
);

module.exports = Goal;