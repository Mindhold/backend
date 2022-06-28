const { createProject, deleteProject, changeProject, readAllProjects } = require("../controllers/project.controller.js");
 
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/project", readAllProjects)
    app.post("/project", createProject);
    app.delete("/project", deleteProject);
    app.put("/project", changeProject);
};