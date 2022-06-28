const db = require("../models/index.js");
const Closet = db.closet;

async function readClosets(req, res) {
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

const changeCloset = (req, res) => {
    const id = req.body.id;

    Closet.updateOne({ _id: id }, {
        info: req.body.info,
        projects: req.body.projects,
        linkedClosets: req.body.linkedClosets
        }, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send({message: "successfully changed closet", closet: req.body});
        })
}

module.exports = {
    readClosets,
    createCloset,
    deleteCloset,
    changeCloset
};