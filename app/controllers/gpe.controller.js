const db = require("../models/index.js");
const Gpe = db.gpe;

async function readAllGpes(req, res) {
    // TODO: resolve linkedGpes. They need to come before.
    const allGpes = await Gpe.aggregate([{$sort: {due_date: -1}}]);
    const firstUndatedIndex = allGpes.findIndex(gpe => !("due_date" in gpe) || gpe.due_date === null);
    const datedGpes = allGpes.slice(0, firstUndatedIndex);
    const undatedGpes = allGpes.slice(firstUndatedIndex);
    res.send({"dated": datedGpes, "undated": undatedGpes});
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