const { createPriority, deletePriority, changePriority, readAllPriorities } = require("../controllers/priority.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/priority", readAllPriorities)
    app.post("/priority", createPriority);
    app.delete("/priority", deletePriority);
    app.put("/priority", changePriority);
};