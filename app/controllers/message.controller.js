const db = require("../models/index.js");
const Message = db.message;

async function readAllMessagesFilterByProjectId(req, res) {
    const allMessagesWithGoals = await Message.aggregate([
        // Stage 1: Filter by projectId
        {$match: {projectId: req.body.projectId}},

        // Stage 2: Get goals
        { $lookup: {
                from: "gpes",
                localField: "linkedGoalId",
                foreignField: "id",
                as: "goals"
            }
        },

        // Stage 3: Get projects
        { $lookup: {
                from: "projects",
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
        id: msg.id,
        date: msg.date,
        content: msg.goals.length ? msg.goals[0].name : msg.content,
        isIncoming: msg.isIncoming
    }));
    res.status(200).send(allMessages);
}

async function readAllMessages(req, res) {
    const allMessagesWithGoals = await Message.aggregate([

        // Stage 1: Get goals
        { $lookup: {
                from: "gpes",
                localField: "linkedGoalId",
                foreignField: "id",
                as: "goals"
            }
        },

        // Stage 2: Get projects
        { $lookup: {
                from: "projects",
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
        id: msg.id,
        date: msg.date,
        content: msg.goals.length ? msg.goals[0].name : msg.content,
        isIncoming: msg.isIncoming
    }));
    res.status(200).send(allMessages);
}

const createMessage = (req, res) => {
    const message = new Message({
        id: req.body.id,
        date: req.body.date,
        content: req.body.content,
        isIncoming: req.body.isIncoming,
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
    // Message.deleteMany({}).catch(err => console.log(err));
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
        isIncoming: req.body.isIncoming,
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
    readAllMessagesFilterByProjectId,
    readAllMessages,
    createMessage,
    deleteMessage,
    changeMessage
};