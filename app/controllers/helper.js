const db = require("../models/index.js");
const Project = db.project;
const Priority = db.priority;

async function iReadOrCreateGeneralPriority() {
    let generalPriority = await Priority.findOne({title: "General"});
    if (generalPriority === null) {
        generalPriority = new Priority({
            id: "generalPriority",
            title: "General"
        });
        return generalPriority.save().then(createdPriority => createdPriority.id).catch(err => {console.log(err); return null});
    }
    return generalPriority.id;
}

module.exports = {
    iReadOrCreateGeneralPriority
}