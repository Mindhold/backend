const db = require("../models/index.js");
const Project = db.project;

async function readAllProjects(req, res) {
    const allProjects = await Project.find({});
    res.send(allProjects);
}

const createProject = (req, res) => {
    const project = new Project({
        id: req.body.id,
        title: req.body.title
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
        title: req.body.title
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