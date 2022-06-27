const db = require("../models/index.js");
const Closet = db.closet;

const createCloset = (req, res) => {
    const closet = new Closet({
        date: new Date(),
        info: req.body.info,
        projects: req.body.projects,
        linkedClosets: req.body.linkedClosets
    })

    closet.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
}

const deleteCloset = (req, res) => {
    const id = req.body.id;

    Closet.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
}

const changeCloset = (req, res) => {
    const id = req.body.id;

    Closet.updateOne({ _id: id }, {
        info: req.body.info,
        projects: req.body.projects,
        linkedClosets: req.body.linkedClosets
        }, function(err, res) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
}

module.exports = {
    createCloset,
    deleteCloset,
    changeCloset
};