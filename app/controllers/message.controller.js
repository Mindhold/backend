const db = require("../models/index.js");
const Message = db.message;

async function readAllMessages(req, res) {
    const allMessagesWithGoals = await Message.aggregate([

        // Stage 1: Get goals
        { $lookup: {
                from: "Gpe",
                localField: "linkedGoalId",
                foreignField: "id",
                as: "goals"
            }
        },

        // Stage 2: Get projects
        { $lookup: {
                from: "Project",
                localField: "projectId",
                foreignField: "id",
                as: "projects"
            }
        }
    ]);

    // Client has different form of displaying messages
    const allMessages = allMessagesWithGoals.map(msg => ({
        linkedGoal: msg.goals.length ? msg.goals[0] : null,
        project: msg.projects.length ? msg.projects[0] : null,
        id: msg[id],
        date: msg[date],
        content: msg[content],
        type: msg[type]
    }));
    res.send(allMessages);
}

const createMessage = (req, res) => {
    const message = new Message({
        id: req.body.id,
        date: req.body.date,
        content: req.body.content,
        type: req.body.type,
        linkedGoalId: req.body.linkedGoalId,
        projectId: req.body.projectId || "000"
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
        type: req.body.type,
        linkedGoalId: req.body.linkedGoalId,
        projectId: req.body.projectId || "000"
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