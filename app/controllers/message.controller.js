const db = require("../models/index.js");
const Message = db.message;

async function readAllMessages(req, res) {
    const allMessages = await Message.find({});
    res.send(allMessages);
}

const createMessage = (req, res) => {
    const message = new Message({
        id: req.body.id,
        date: req.body.date,
        content: req.body.content,
        projects: req.body.projects || []
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
    Message.deleteOne({ id: req.body.id }, function (err) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message: "successfully deleted message"});
    });
}

async function changeMessage(req, res) {
    const updatedMessage = await Message.findOneAndUpdate({ id: req.body.id }, {
        content: req.body.content,
        projects: req.body.projects || []
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