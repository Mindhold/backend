const db = require("../models/index.js");
const Closet = db.closet;

async function readAllClosets(req, res) {
    const allClosets = await Closet.find({});
    res.send(allClosets);
}

const createCloset = (req, res) => {
    const closet = new Closet({
        date: new Date(),
        info: req.body.info,
        projects: req.body.projects,
        linkedClosets: req.body.linkedClosets
    })

    closet.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created closet"});
    });
}

const deleteCloset = (req, res) => {
    const id = req.body.id;

    Closet.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted closet"});
    });
}

async function changeCloset(req, res) {
    const id = req.body.id;

    const updatedCloset = await Closet.findOneAndUpdate({ _id: id }, {
        info: req.body.info,
        projects: req.body.projects,
        linkedClosets: req.body.linkedClosets
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed gpe", gpe: updatedCloset});
}

module.exports = {
    readAllClosets,
    createCloset,
    deleteCloset,
    changeCloset
};