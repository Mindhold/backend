const db = require("../models/index.js");
const Message = db.message;

async function readAllMessages(req, res) {
    const allMessages = await Message.find({});
    res.send(allMessages);
}

const createMessage = (req, res) => {
    const message = new Message({
        date: req.body.date,
        content: req.body.content,
        projects: req.body.projects
    })

    message.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully created message"});
    });
}

const deleteMessage = (req, res) => {
    const id = req.body.id;

    Message.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted message"});
    });
}

async function changeMessage(req, res) {
    const id = req.body.id;

    const updatedMessage = await Message.findOneAndUpdate({ _id: id }, {
        content: req.body.content,
        projects: req.body.projects
        }, {new: true, useFindAndModify: false}, function(err, putResponse) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        })
    
    res.status(200).send({message: "successfully changed message", message: updatedMessage});
}

module.exports = {
    readAllMessages,
    createMessage,
    deleteMessage,
    changeMessage
};