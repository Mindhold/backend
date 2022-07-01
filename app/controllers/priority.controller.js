const db = require("../models/index.js");
const Priority = db.priority;

async function readAllPriorities(req, res) {
    const allPriorities = await Priority.find({});
    res.send(allPriorities);
}

const createPriority = (req, res) => {
    const priority = new Priority({
        id: req.body.id,
        title: req.body.title,
        projects: req.body.projects
    })

    priority.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created priority"});
    });
}

const deletePriority = (req, res) => {
    Priority.deleteOne({ id: req.body.id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted priority"});
    });
}

async function changePriority(req, res) {
    const updatedPriority = await Priority.findOneAndUpdate({ id: req.body.id }, {
        title: req.body.title,
        projects: req.body.projects
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed priority", priority: updatedPriority});
}

module.exports = {
    readAllPriorities,
    createPriority,
    deletePriority,
    changePriority
};