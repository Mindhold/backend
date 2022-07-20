const { createGpe, deleteGpe, changeGpe, readAllGpes, readAllGpesByProjectId } = require("../controllers/gpe.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/gpe", readAllGpes)
    app.post("/gpe/projectId", readAllGpesByProjectId);
    app.post("/gpe", createGpe);
    app.delete("/gpe", deleteGpe);
    app.put("/gpe", changeGpe);
};