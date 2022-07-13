const { createMemory, deleteMemory, changeMemory, readAllMemories } = require("../controllers/memory.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/memory", readAllMemories)
    app.post("/memory", createMemory);
    app.delete("/memory", deleteMemory);
    app.put("/memory", changeMemory);
};