const db = require("../models/index.js");
const Memory = db.memory;

async function readAllMemories(req, res) {
    const allMemories = await Memory.find({});
    res.send(allMemories);
}

const createMemory = (req, res) => {
    const memory = new Memory({
        id: req.body.id,
        info: req.body.info,
        projects: req.body.projects,
        linkedMemories: req.body.linkedMemories
    })

    memory.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created memory"});
    });
}

const deleteMemory = (req, res) => {
    // Memory.deleteMany({}).catch(err => console.log(err));
    Memory.deleteOne({ id: req.body.id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted memory"});
    });
}

async function changeMemory(req, res) {
    const updatedMemory = await Memory.findOneAndUpdate({ id: req.body.id }, {
        info: req.body.info,
        projects: req.body.projects,
        linkedMemories: req.body.linkedMemories
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed gpe", gpe: updatedMemory});
}

module.exports = {
    readAllMemories,
    createMemory,
    deleteMemory,
    changeMemory
};