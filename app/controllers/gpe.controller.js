const db = require("../models/index.js");
const Gpe = db.gpe;

async function readAllGpes(req, res) {
    const allGpes = await Gpe.find({});
    res.send(allGpes);
}

const createGpe = (req, res) => {
    const gpe = new Gpe({
        id: req.body.id,
        deadline: req.body.deadline,
        duration: req.body.duration,
        gpe: req.body.gpe,
        projects: req.body.projects || [],
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
        deadline: req.body.deadline,
        duration: req.body.duration,
        gpe: req.body.gpe,
        projects: req.body.projects,
        prevGpes: req.body.prevGpes
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