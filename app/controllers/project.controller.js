const db = require("../models/index.js");
const Project = db.project;

async function readAllProjects(req, res) {
    const allProjects = await Project.find({});
    res.send(allProjects);
}

const createProject = (req, res) => {
    const project = new Project({
        date: new Date(),
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
    const id = req.body.id;

    Project.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted project"});
    });
}

async function changeProject(req, res) {
    const id = req.body.id;

    const updatedProject = await Project.findOneAndUpdate({ _id: id }, {
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