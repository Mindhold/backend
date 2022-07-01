const db = require("../models/index.js");
const { iReadOrCreateGeneralPriority } = require("./helper.js");
const Project = db.project;

async function readAllProjects(req, res) {
    const allProjects = await Project.find({});
    res.send(allProjects);
}

async function createProject(req, res) {
    let priorityId = req.body.priorityId;
    if (!priorityId) {
        priorityId = await iReadOrCreateGeneralPriority();
        if (!priorityId) {
            res.status(500).send({ message: "failed to read general priority id" });
            return;
        }
    }

    const project = new Project({
        id: req.body.id,
        title: req.body.title,
        priorityId: priorityId
    })

    project.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created project"});
    });
}

const deleteProject = (req, res) => {
    Project.deleteOne({ id: req.body.id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted project"});
    });
}

async function changeProject(req, res) {
    const updatedProject = await Project.findOneAndUpdate({ id: req.body.id }, {
        title: req.body.title,
        priority: req.body.priority
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed project", project: updatedProject});
}

module.exports = {
    readAllProjects,
    createProject,
    deleteProject,
    changeProject
};