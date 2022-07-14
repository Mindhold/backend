const db = require("../models/index.js");
const Gpe = db.gpe;

async function readAllGpes(req, res) {
    const allGpes = await Gpe.find({});
    res.send(allGpes);
}

const createGpe = (req, res) => {
    const gpe = new Gpe({
        id: req.body.id,
        due_date: req.body.due_date,
        duration: req.body.duration,
        completed: req.body.completed,
        name: req.body.name,
        type: req.body.type,
        notes: req.body.notes,
        projectId: req.body.projectId || "000",
        prevGpes: req.body.prevGpes || []
    })

    gpe.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created gpe"});
    });
}

const deleteGpe = (req, res) => {
    // Gpe.deleteMany({}).catch(err => console.log(err));
    Gpe.deleteOne({ id: req.body.id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted gpe"});
    });
}

async function changeGpe(req, res) {
    const updatedGpe = await Gpe.findOneAndUpdate({ id: req.body.id }, {
        due_date: req.body.due_date,
        duration: req.body.duration,
        completed: req.body.completed,
        name: req.body.name,
        type: req.body.type,
        notes: req.body.notes,
        projectId: req.body.projectId || "000",
        prevGpes: req.body.prevGpes || []
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed gpe", gpe: updatedGpe});
}

module.exports = {
    readAllGpes,
    createGpe,
    deleteGpe,
    changeGpe
};