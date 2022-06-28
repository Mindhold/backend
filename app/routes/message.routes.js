const { createMessage, deleteMessage, changeMessage, readAllMessages } = require("../controllers/message.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/message", readAllMessages)
    app.post("/message", createMessage);
    app.delete("/message", deleteMessage);
    app.put("/message", changeMessage);
};